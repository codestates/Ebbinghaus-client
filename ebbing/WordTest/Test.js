import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
// import questions from '../DummyData/MineWordList';
import ADDRESS from '../DummyData/Address';
const Address = ADDRESS;

const { height, width } = Dimensions.get('window');

export default class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      wordAnswer: '',
      correctCount: 0,
      totalCount: 0,
      activeQuestionIndex: 0,
      answered: false,
      answerCorrect: false,
      dataSource: [],
    };

    // textInput DOM 엘리먼트를 저장하기 위한 ref를 생성
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
    this.inputEnter = this.inputEnter.bind(this);
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.focusTextInput();
      this.fetchData();
    });
  }

  async fetchData() {
    let userId = await AsyncStorage.getItem('userId');

    try {
      const response = await fetch(`${Address}/test/${userId}`);
      const responseJson = await response.json();

      this.setState({
        dataSource: responseJson,
        totalCount: responseJson.length,
      });
    } catch (e) {
      console.error(e);
    }
    console.log('dataSource', this.state.dataSource);
  }

  answer = (correct) => {
    this.setState(
      (state) => {
        const nextState = { answered: true };
        // const nextState = {};
        if (
          this.state.dataSource[this.state.activeQuestionIndex].word_kor ===
          correct
        ) {
          // nextState.answered = true;
          nextState.correctCount = state.correctCount + 1;
          nextState.answerCorrect = true;
          this.requestCheck({
            word_kor: correct,
            word_eng: this.state.dataSource[this.state.activeQuestionIndex]
              .word_eng,
          });
        } else {
          nextState.answerCorrect = false;
          // this.setModalVisible(true);
        }

        return nextState;
      },
      () => {
        setTimeout(() => this.nextQuestion(), 750);
      }
    );
  };

  nextQuestion = () => {
    this.clearTextInput();
    this.focusTextInput();

    this.setState((state) => {
      const nextIndex = state.activeQuestionIndex + 1;

      if (nextIndex >= state.totalCount) {
        return this.props.navigation.popToTop();
      }

      return {
        activeQuestionIndex: nextIndex,
        answered: false,
      };
    });
  };

  _handleButtonPress = () => {
    this.setModalVisible(true);
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  focusTextInput() {
    // DOM API를 사용하여 명시적으로 text 타입의 input 엘리먼트를 포커스
    // DOM 노드를 얻기 위해 "current" 프로퍼티에 접근
    this.textInput.current.focus();
  }

  clearTextInput() {
    this.setState({
      wordAnswer: '',
    });
  }

  async requestCheck(data) {
    let userId = await AsyncStorage.getItem('userId');
    let options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify({
        selectedWords: [data],
        id: userId,
      }),
    };

    try {
      const response = await fetch(`${Address}/test/pass`, options);
      const responseJson = await response.json();
    } catch (e) {
      console.error(e);
    }
  }

  //Enter시 정답체크 함수 실행
  inputEnter = (wordAnswer) => (e) => {
    if (e.nativeEvent.keyCode === 13) {
      this.answer(wordAnswer);
    }
  };

  render() {
    const { navigation } = this.props;
    const {
      dataSource,
      activeQuestionIndex,
      correctCount,
      totalCount,
      wordAnswer,
    } = this.state;
    const question = dataSource[activeQuestionIndex];

    return (
      <View style={styles.test}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <TouchableOpacity
            style={[styles.container, styles.modalBackgroundStyle]}
            onPress={this.setModalVisible.bind(this, false)}
          >
            <View style={styles.innerContainerTransparentStyle}>
              <Feather
                name="check"
                style={{
                  color: '#00cc73',
                }}
              />
              <Text>{question !== undefined ? question.word_kor : ''}</Text>
              <Text>{question !== undefined ? question.word_eng : ''}</Text>
              {/* <Button
                title="close"
                onPress={this.setModalVisible.bind(this, false)}
              /> */}
            </View>
          </TouchableOpacity>
        </Modal>
        <View style={styles.right}>
          <Text style={styles.white}>{`정답 : ${correctCount}     남은 문제 : ${
            totalCount - activeQuestionIndex
          }`}</Text>
        </View>

        <View style={styles.examQuestions}>
          <Text>{question !== undefined ? question.word_eng : ''}</Text>
        </View>

        <TextInput
          style={styles.inputAnswer}
          ref={this.textInput}
          onChangeText={(wordAnswer) => this.setState({ wordAnswer })}
          onKeyPress={this.inputEnter(wordAnswer)}
          value={wordAnswer}
        ></TextInput>

        <View style={styles.selectDoView}>
          <TouchableOpacity
            style={styles.selectDoBtn}
            onPress={() => navigation.navigate('Main')}
          >
            <Text style={styles.selectDoText}>그만하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectDoBtn}
            onPress={() => {
              this.answer(wordAnswer);
              this.clearTextInput();
              this.focusTextInput();
            }}
          >
            <Text style={styles.selectDoText}>정답 확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const selectDoHeight = 70;
const standardWidth = width - width / 2;

const styles = StyleSheet.create({
  test: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#000',
    paddingTop: 50,
  },
  examQuestions: {
    width: standardWidth,
    height: 180,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  inputAnswer: {
    width: standardWidth,
    height: 180,
    backgroundColor: '#fff',
    textAlign: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  checkBtnView: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: standardWidth,
    marginBottom: 80,
    marginTop: 10,
  },
  checkBtn: {
    backgroundColor: '#fff',
    padding: 10,
  },
  selectDoView: {
    width: width,
    height: selectDoHeight,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  selectDoBtn: {
    borderColor: '#000',
    borderWidth: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width / 2,
    height: selectDoHeight,
  },
  selectDoText: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  modalBackgroundStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainerTransparentStyle: {
    backgroundColor: '#fff',
    padding: 20,
  },
  white: {
    color: '#fff',
    fontSize: 15,
  },
  right: {
    marginBottom: 10,
    marginLeft: 650,
  },
});
