import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const { height, width } = Dimensions.get('window');

export default class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      wordAnswer: '',
    };

    // textInput DOM 엘리먼트를 저장하기 위한 ref를 생성
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

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

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.focusTextInput();
    });
  }

  render() {
    const { navigation } = this.props;
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
              <Text>한글</Text>
              <Text>English</Text>
              {/* <Button
                title="close"
                onPress={this.setModalVisible.bind(this, false)}
              /> */}
            </View>
          </TouchableOpacity>
        </Modal>

        <View style={styles.examQuestions}>
          <Text>사과</Text>
        </View>

        <TextInput
          style={styles.inputAnswer}
          ref={this.textInput}
          onChangeText={(wordAnswer) => this.setState({ wordAnswer })}
        ></TextInput>

        <View style={styles.checkBtnView}>
          <TouchableOpacity
            style={styles.checkBtn}
            onPress={this._handleButtonPress}
          >
            <Text>Check</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.selectDoView}>
          <TouchableOpacity style={styles.selectDoBtn}>
            <Text style={styles.selectDoText}>건너뛰기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectDoBtn}
            onPress={() => navigation.navigate('Main')}
          >
            <Text style={styles.selectDoText}>그만하기</Text>
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
});
