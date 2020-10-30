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
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ADDRESS from '../../DummyData/Address';

const { height, width } = Dimensions.get('window');
const Address = ADDRESS;

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
    this.deleteBtn = this.deleteBtn.bind(this);
    this.inputEnter = this.inputEnter.bind(this);
  }

  focusTextInput() {
    // DOM API를 사용하여 명시적으로 text 타입의 input 엘리먼트를 포커스
    // DOM 노드를 얻기 위해 "current" 프로퍼티에 접근
    this.textInput.current.focus();
  }

  clearTextInput() {
    this.setState({
      word_eng: '',
      word_kor: '',
    });
  }

  async getMineWordList() {
    let userId = await AsyncStorage.getItem('userId');

    try {
      const response = await fetch(`${Address}/word/mine/${userId}`);
      const responseJson = await response.json();

      responseJson.map((item) => {
        item.isSelect = false;
        item.selectedClass = styles.list;
        return item;
      });
      this.setState({
        wordList: responseJson,
      });
    } catch (e) {
      console.error(e);
    }
  }
  // async getMineWordList() {
  //   let userId = await AsyncStorage.getItem('userId');

  //   try {
  //     await fetch(`${Address}/word/mine/${userId}`)
  //       .then((res) => res.json())
  //       .then((result) => {
  //         result = result.map((item) => {
  //           item.isSelect = false;
  //           item.selectedClass = styles.list;
  //           return item;
  //         });
  //         this.setState({
  //           wordList: result,
  //         });
  //       })
  //       .catch((e) => {
  //         console.error(e);
  //       });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  //item의 선택에 대한 함수
  //선택에 따른 스타일 변경 및
  selectItem = (data) => {
    data.item.isSelect = !data.item.isSelect;
    data.item.selectedClass = data.item.isSelect
      ? [styles.selected, styles.white]
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
  async deleteBtn(data) {
    let result = [];
    let userId = await AsyncStorage.getItem('userId');

    try {
      data.forEach((element) => {
        if (element.isSelect === true) {
          result.push(element);
        }
      });

      let options = {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        credentials: 'include',
        body: JSON.stringify({
          selectedWords: [...result],
          id: userId,
        }),
      };
      fetch(`${Address}/word/mine/delete`, options).then(() => {
        this.getMineWordList();
      });
    } catch (e) {
      console.error(e);
    }
  }

  //List의 사이사이 빈 공간
  FlatListItemSeparator = () => <View style={styles.line} />;

  mineWordList = (data) => (
    <TouchableOpacity
      style={[styles.list, data.item.selectedClass, styles.mineWordList]}
      onPress={() => this.selectItem(data)}
    >
      <View style={styles.mineWordRow}>
        <Text style={[styles.text, data.item.selectedClass]}>
          {data.item.word_eng}
        </Text>
      </View>
      <View style={styles.mineWordRow}>
        <Text style={[styles.text, data.item.selectedClass]}>
          {data.item.word_kor}
        </Text>
      </View>
    </TouchableOpacity>
  );

  async reqRegistWord() {
    let userId = await AsyncStorage.getItem('userId');
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
        user_id: userId,
      }),
    };

    try {
      fetch(`${Address}/word/mine/register`, options).then(() => {
        this.clearTextInput();
        this.focusTextInput();
        this.getMineWordList();
      });
    } catch (e) {
      console.error(e);
    }
  }

  //Enter시 단어등록 함수 실행
  inputEnter = () => (e) => {
    if (e.nativeEvent.keyCode === 13) {
      this.reqRegistWord();
    }
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.focusTextInput();
      this.getMineWordList();
    });
  }
  render() {
    const { navigation } = this.props;
    const { wordList, word_eng, word_kor } = this.state;
    return (
      <View style={styles.registerWords}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>나만의 단어장</Text>
        </View>
        <View style={styles.inputWordView}>
          <TextInput
            style={styles.inputWord}
            placeholder="Input English"
            onChangeText={(word_eng) => this.setState({ word_eng })}
            onKeyPress={this.inputEnter()}
            value={word_eng}
            ref={this.textInput}
          ></TextInput>
          <TextInput
            style={styles.inputWord}
            placeholder="Input Korean"
            onChangeText={(word_kor) => this.setState({ word_kor })}
            onKeyPress={this.inputEnter()}
            value={word_kor}
          ></TextInput>
        </View>
        <View style={styles.registButtonView}>
          <TouchableOpacity
            style={styles.registButton}
            onPress={() => this.reqRegistWord()}
          >
            <Text style={styles.white}>등록</Text>
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
              <TouchableOpacity
                style={styles.wordListBtn}
                onPress={() => this.deleteBtn(wordList)}
              >
                <AntDesign name="closecircleo" color={'#E42A2A'} size={20} />
                <Text> 삭제</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.wordListBtn}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <AntDesign name="checkcircleo" color={'#0DDC6C'} size={20} />
                <Text> 완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.wordListView}>
            <Text style={[styles.wordListView, styles.noRegisteredWord]}>
              현재 등록된 단어가 없습니다.
            </Text>
            <View style={styles.wordListBtnView}>
              <TouchableOpacity
                style={styles.wordListBtn}
                onPress={() => this.deleteBtn(wordList)}
              >
                <AntDesign name="closecircleo" color={'#E42A2A'} size={20} />
                <Text> 삭제</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.wordListBtn}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <AntDesign name="checkcircleo" color={'#0DDC6C'} size={20} />
                <Text> 완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const standardWidth = width * 0.85;

const styles = StyleSheet.create({
  registerWords: {
    flex: 1,
    backgroundColor: '#252B39',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 40,
  },
  headerTitle: {
    marginBottom: 10,
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
  },
  headerTitleText: {
    color: '#fff',
    width: standardWidth,
    textAlign: "center",
    fontSize: 20,
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
    flexDirection: 'row',
    justifyContent: 'center',
    width: standardWidth,
    marginTop: 15,
  },
  registButton: {
    backgroundColor: '#fff',
    width: standardWidth,
    height: height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#99D7ED',
  },
  wordListView: {
    marginTop: 15,
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
    marginTop: 20,
  },
  wordListBtn: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: standardWidth / 2 - 10,
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
    fontSize: 20,
    color: '#000',
  },
  selected: { backgroundColor: '#99D7ED' },
  list: {
    paddingVertical: 5,
    margin: 2,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: -1,
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  white: {
    color: '#fff',
  },
});
