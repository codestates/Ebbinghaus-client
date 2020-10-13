import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default class RegisterWords extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      word_eng: '',
      word_kor: '',
    };

    // textInput DOM 엘리먼트를 저장하기 위한 ref를 생성합니다.
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // DOM API를 사용하여 명시적으로 text 타입의 input 엘리먼트를 포커스합니다.
    // 주의: 우리는 지금 DOM 노드를 얻기 위해 "current" 프로퍼티에 접근하고 있습니다.
    this.textInput.current.focus();
  }

  componentDidMount() {
    this.focusTextInput();
  }
  render() {
    return (
      <ScrollView style={styles.registScroll}>
        <View style={styles.registerWords}>
          <View style={styles.headerTitleView}>
            <Text style={styles.headerTitleText}>나만의 단어장</Text>
          </View>
          <View>
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
            <TouchableOpacity style={styles.registButton}>
              <Text>등록</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  registScroll: {
    flex: 1,
    backgroundColor: '#000',
  },
  registerWords: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 40,
  },
  headerTitleView: {
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: width - 100
  },
  headerTitleText: {
    color: '#fff',
  },
  inputWord: {
    backgroundColor: '#fff',
    width: width - 100,
    height: 100,
    textAlign: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  registButtonView: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    width: width - 100
  },
  registButton: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10
  },
});
