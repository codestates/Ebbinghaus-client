import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { AuthContext } from '../AppContext';

export default function Login({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn, googleSignIn } = React.useContext(AuthContext);

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
      <View style={styles.buttonSpace}>
        <TouchableOpacity
          style={[styles.buttonCenterText, styles.button]}
          onPress={() => googleSignIn()}
        >
          <AntDesign name="google" color={'#252B39'} size={20} />
          <Text> Google로 계속하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonCenterText, styles.button]}
          onPress={() =>
            signIn({
              username,
              password,
            })
          }
        >
          <Text>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.foot}>
        <Text style={{ color: '#fff' }}>계정이 없으신가요? </Text>
        <Text
          onPress={() => navigation.navigate('Signup')}
          style={styles.unFontColor}
        >
          회원가입
        </Text>
      </View>
    </View>
  );
}
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
    margin: '-3%',
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  fontColor: {
    color: '#fff',
  },
  unFontColor: {
    color: '#B1E2F3',
  },
  foot: {
    flexDirection: 'row',
  },
  buttonCenterText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSpace: {
    justifyContent: 'space-around',
    height: height * 0.2,
  },
});
