import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

const { height, width } = Dimensions.get('window');
const Address = 'http://localhost:4000';

export default class RegisterWords extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      word_eng: '',
      word_kor: '',
      wordList: [],
    };

    // textInput DOM 엘리먼트를 저장하기 위한 ref를 생성
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
    this.getMineWordList = this.getMineWordList.bind(this);
    this.reqRegistWord = this.reqRegistWord.bind(this);
    console.log('width and height', width, height);
  }

  focusTextInput() {
    // DOM API를 사용하여 명시적으로 text 타입의 input 엘리먼트를 포커스
    // DOM 노드를 얻기 위해 "current" 프로퍼티에 접근
    this.textInput.current.focus();
  }

  async getMineWordList() {
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    try {
      await fetch(`${Address}/word/mine`, options)
        .then((res) => res.json())
        .then((result) => {
          result = result.map((item) => {
            item.isSelect = false;
            item.selectedClass = styles.list;
            return item;
          });
          this.setState({
            wordList: result,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (e) {
      console.error(e);
    }
  }

  //item의 선택에 대한 함수
  //선택에 따른 스타일 변경 및
  selectItem = (data) => {
    data.item.isSelect = !data.item.isSelect;
    data.item.selectedClass = data.item.isSelect
      ? styles.selected
      : styles.list;

    const index = this.state.wordList.findIndex(
      (item) => data.item.id === item.id
    );

    this.state.wordList[index] = data.item;

    this.setState({
      wordList: this.state.wordList,
    });
  };

  /* Server에 delete 구현 시 그에 맞춰 작성 */
  // deleteBtn = (data) => {
  //   let result = [];
  //   data.forEach((element) => {
  //     if (element.isSelect === true) {
  //       result.push(element);
  //     }
  //   });

  //   let options = {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json;charset=UTF-8',
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify({
  //       array: [...result],
  //     }),
  //   };
  //   fetch('http://localhost:4000/word/mine/', options).then(
  //     this.fetchData()
  //   );
  // };

  //List의 사이사이 빈 공간
  FlatListItemSeparator = () => <View style={styles.line} />;

  mineWordList = (data) => (
    <TouchableOpacity
      style={[styles.list, data.item.selectedClass, styles.mineWordList]}
      onPress={() => this.selectItem(data)}
    >
      <View style={styles.mineWordRow}>
        <Text style={styles.text}>{data.item.word_eng}</Text>
      </View>
      <View style={styles.mineWordRow}>
        <Text style={styles.text}>{data.item.word_kor}</Text>
      </View>
    </TouchableOpacity>
  );

  async reqRegistWord() {
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        word_eng: this.state.word_eng,
        word_kor: this.state.word_kor,
      }),
    };

    try {
      await fetch(`${Address}/word/mine/register`, options)
        .then((res) => res.json())
        .then((result) => {
          this.getMineWordList();
        });
    } catch (e) {
      console.error(e);
    }
  }

  componentDidMount() {
    this.focusTextInput();
    this.getMineWordList();
  }
  render() {
    const { navigation } = this.props;
    const { wordList } = this.state;
    return (
      <View style={styles.registerWords}>
        <Text style={styles.headerTitleText}>나만의 단어장</Text>
        <View style={styles.inputWordView}>
          <TextInput
            style={styles.inputWord}
            placeholder="Input English"
            onChangeText={(word_eng) => this.setState({ word_eng })}
            ref={this.textInput}
          ></TextInput>
          <TextInput
            style={styles.inputWord}
            placeholder="Input Korean"
            onChangeText={(word_kor) => this.setState({ word_kor })}
          ></TextInput>
        </View>
        <View style={styles.registButtonView}>
          <TouchableOpacity
            style={styles.registButton}
            onPress={() => this.reqRegistWord()}
          >
            <Text>등록</Text>
          </TouchableOpacity>
        </View>

        {wordList.length !== 0 ? (
          <View style={styles.wordListView}>
            <FlatList
              style={styles.wordListFlat}
              data={wordList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={(item) => this.mineWordList(item)}
              windowSize={2}
              extraData={this.state}
              ItemSeparatorComponent={this.FlatListItemSeparator}
            />
            <View style={styles.wordListBtnView}>
              <TouchableOpacity style={styles.wordListBtn}>
                <Text>삭제</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.wordListBtn}
                onPress={() => navigation.navigate('MineWords')}
              >
                <Text>완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={[styles.wordListView, styles.noRegisteredWord]}>
            현재 등록된 단어가 없습니다.
          </Text>
        )}
      </View>
    );
  }
}

const standardWidth = width - width / 8;

const styles = StyleSheet.create({
  registerWords: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 40,
  },
  headerTitleText: {
    color: '#fff',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: standardWidth,
  },
  inputWordView: {
    width: standardWidth,
    height: '30%',
  },
  inputWord: {
    backgroundColor: '#fff',
    width: standardWidth,
    height: '50%',
    textAlign: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  registButtonView: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    width: standardWidth,
    marginTop: 15,
  },
  registButton: {
    backgroundColor: '#fff',
    width: 70,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  wordListView: {
    marginTop: 30,
    height: '50%',
    width: standardWidth,
  },
  noRegisteredWord: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  wordListFlat: {
    backgroundColor: '#fff',
    width: standardWidth,
  },
  wordListBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  wordListBtn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 70,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mineWordList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mineWordRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    padding: 10,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    color: '#fff',
  },
  selected: { backgroundColor: '#FA7B5F' },
  list: {
    paddingVertical: 5,
    margin: 2,
    flexDirection: 'row',
    backgroundColor: '#192338',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: -1,
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
