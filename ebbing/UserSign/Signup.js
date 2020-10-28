import React, { Component } from 'react';
import {
  Alert,
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../AppContext';

export default function Signup({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pwCheck, setPwCheck] = React.useState('');
  const [warningMsg, setWarningMsg] = React.useState('');
  const [passCheck, setPassCheck] = React.useState(false);
  const { signUp } = React.useContext(AuthContext);

  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changePwCheck = (e) => {
    setPwCheck(e.target.value);
  };

  React.useEffect(() => {
    const checkPassword = () => {
      if (password !== pwCheck) {
        setWarningMsg('비밀번호가 일치하지 않습니다.');
        setPassCheck(false);
      } else if (password !== '') {
        setWarningMsg('비밀번호가 일치합니다.');
        setPassCheck(true);
      }
    };
    checkPassword();
  }, [password, pwCheck, passCheck]);

  return (
    <View style={styles.container}>
      <View>
        <Text>Username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder={'Username'}
          style={styles.input}
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          value={password}
          onChange={changePassword}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
      </View>

      <View>
        <Text>Password Check</Text>
        <TextInput
          value={pwCheck}
          onChange={changePwCheck}
          placeholder={'Password Check'}
          secureTextEntry={true}
          style={styles.input}
        />
        <Text>{warningMsg}</Text>
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          if (passCheck) {
            signUp({ username, password });
            navigation.navigate('Login');
          } else {
            Alert.alert('비밀번호 확인을 다시 해주세요!');
          }
        }}
      >
        <Text>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C0D2F1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
});
