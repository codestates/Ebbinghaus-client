import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const { height, width } = Dimensions.get('window');

export default class MyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.myPage}>
        <View style={styles.myPageBox}>
          <View style={styles.idColumn}>
            <View>
              <Text>ID</Text>
            </View>
            <View>
              <TouchableOpacity>
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text>Today</Text>
          </View>
          <View>
            <Text>Doing</Text>
          </View>
          <View>
            <Text>Finish</Text>
          </View>
        </View>
      </View>
    );
  }
}

const myPageBoxWith = width - 100;
const styles = StyleSheet.create({
  myPage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  myPageBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: myPageBoxWith,
    height: height - 500,
  },
  idColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: myPageBoxWith - 40,
  },
});
