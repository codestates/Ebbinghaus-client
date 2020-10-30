import React, { Component } from 'react';
import {
  Alert,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { AuthContext } from '../AppContext';


export default function Signup({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordCheck, setPasswordCheck] = React.useState('');
  const [warningMsgPW, setWarningMsgPW] = React.useState(
    '비밀번호가 일치하지 않습니다.'
  );
  const [warningMsgName, setWarningMsgName] = React.useState(
    '아이디를 입력해주세요'
  );
  const [passCheck, setPassCheck] = React.useState(false);
  const [nameCheck, setNameCheck] = React.useState(false);
  const { signUp } = React.useContext(AuthContext);

  React.useEffect(() => {
    const check = () => {
      if (username === '') {
        setWarningMsgName('아이디를 입력해주세요');
        setNameCheck(false);
      } else if (username !== '') {
        setWarningMsgName('');
        setNameCheck(true);
      }

      if (password !== passwordCheck) {
        setWarningMsgPW('비밀번호가 일치하지 않습니다.');
        setPassCheck(false);
      } else if (password !== '') {
        setWarningMsgPW('비밀번호가 일치합니다.');
        setPassCheck(true);
      }
    };

    check();
  }, [
    username,
    password,
    passwordCheck,
    passCheck,
    warningMsgPW,
    nameCheck,
    warningMsgName,
  ]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.tilteFont}>Ebbing Word</Text>
      </View>
      <View>
        <Text style={username ? styles.unFontColor : styles.fontColor}>
          아이디
        </Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder={'ID'}
          style={username ? styles.unInput : styles.input}
        />
        <Text>{warningMsgName}</Text>
      </View>
      <View>
        <Text style={password ? styles.unFontColor : styles.fontColor}>
          비밀번호
        </Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={'Password'}
          secureTextEntry={true}
          style={password ? styles.unInput : styles.input}
        />
      </View>

      <View>
        <Text style={passwordCheck ? styles.unFontColor : styles.fontColor}>
          비밀번호 확인
        </Text>
        <TextInput
          value={passwordCheck}
          onChangeText={setPasswordCheck}
          placeholder={'Password Check'}
          secureTextEntry={true}
          style={passwordCheck ? styles.unInput : styles.input}
        />
        <Text>{warningMsgPW}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (passCheck && nameCheck) {
            signUp({ username, password });
            navigation.navigate('Login');
          } else if (!nameCheck) {
            Alert.alert('아이디를 입력해주세요!');
          } else if (!passCheck) {
            Alert.alert('비밀번호 확인을 다시 해주세요!');
          }
        }}
      >
        <Text>회원가입 완료</Text>
      </TouchableOpacity>
    </View>
  );
}
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#252B39',
  },
  tilteFont: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    width: width * 0.8,
    height: 44,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginBottom: 10,
  },
  unInput: {
    width: width * 0.8,
    height: 44,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#B1E2F3',
    marginBottom: 10,
    color: '#fff',
  },
  button: {
    height: height * 0.07,
    width: width * 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  fontColor: {
    color: '#fff',
  },
  unFontColor: {
    color: '#B1E2F3',
  },
});
