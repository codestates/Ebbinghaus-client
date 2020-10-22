import React, { Component } from 'react';
import {
  Alert,
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { AuthContext } from '../AppContext';

export default function Signup({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signUp } = React.useContext(AuthContext);

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
          onChangeText={setPassword}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
      </View>

      <View>
        <Text>Password Check</Text>
        <TextInput
          placeholder={'Password Check'}
          secureTextEntry={true}
          style={styles.input}
        />
      </View>

      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={() => {
          signUp({ username, password });
          navigation.navigate('Login');
        }}
      >
        <Text>회원가입</Text>
      </TouchableHighlight>
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
