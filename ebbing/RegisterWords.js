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
import MineWordList from './MineWords/WordList';
const dummyData = require('./DummyData/MineWordList');

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
          this.setState({
            wordList: [...result],
          });
          console.log('서버에서 보내온 resultList ', result);
          console.log('지금 wordList: ', this.state.wordList);
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (e) {
      console.error(e);
    }
  }

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

        {dummyData.length !== 0 ? (
          <View style={styles.wordListView}>
            <FlatList
              style={styles.wordListFlat}
              data={dummyData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MineWordList word={item} />}
              windowSize={2}
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
});
