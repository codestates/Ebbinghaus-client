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

export default class PriorityWords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: ''
    };
  }

  onClickListener = (viewId) => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Username</Text>
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Username'}
            style={styles.input}
          />
        </View>
        <View>
          <Text>Password</Text>
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
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
          onPress={() => this.onClickListener('register')}
        >
          <Text>회원가입</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C0D2F1',
  }
});
