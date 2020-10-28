import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
// import {
//   useFonts,
//   Inter_900Black,
// } from '@expo-google-fonts/inter';

const { height, width } = Dimensions.get('window');
import { AuthContext } from '../AppContext';

export default function Login({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  // let [fontsLoaded] = useFonts({
  //   Inter_900Black,
  // });
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.tilteFont}>Ebbing Word</Text>
      </View>
      <View>
        <Text style={username ? styles.unFontColor : styles.fontColor}>아이디</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder={'ID'}
          style={username ? styles.unInput : styles.input}
        />
      </View>
      <View>
        <Text style={password ? styles.unFontColor : styles.fontColor}>비밀번호</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={'Password'}
          secureTextEntry={true}
          style={password ? styles.unInput : styles.input}
        />
      </View>

      <TouchableOpacity
        style={[styles.buttonCenterText,styles.button]}>
        <Text>Google로 계속하기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonCenterText,styles.button]}
        onPress={() =>
          signIn({
            username,
            password,
          })
        }>
        <Text>로그인</Text>
      </TouchableOpacity>

      <View style={styles.foot}>
        <Text style={{color: "#fff"}}>계정이 없으신가요?  </Text>
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
  },
  input: {
    width: width*0.8,
    height: 44,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginBottom: 10,
  },
  unInput: {
    width: width*0.8,
    height: 44,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#B1E2F3',
    marginBottom: 10,
    color: '#fff',
  },
  button: {
    height: height*0.07,
    width: width*0.8,
    margin: "-3%",
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
    flexDirection:'row',
  },
  buttonCenterText: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
