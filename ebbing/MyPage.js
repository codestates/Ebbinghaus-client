import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './AppContext';

const Stack = createStackNavigator();
const { height, width } = Dimensions.get('window');

export default function MyPage() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.myPage}>
      <View style={styles.myPageBox}>
        <View style={styles.myPageBoxInner}>
          <View style={[styles.idColumn, styles.myPageColumn]}>
            <View>
              <Text>ID</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => signOut()}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.myPageColumn}>
            <Text>Today</Text>
          </View>
          <View style={styles.myPageColumn}>
            <Text>Doing</Text>
          </View>
          <View style={styles.myPageColumn}>
            <Text>Finish</Text>
          </View>
        </View>
      </View>
    </View>
  );
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
  myPageBoxInner: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: myPageBoxWith - 40,
    height: height - 500,
  },
  idColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: myPageBoxWith - 40,
  },
  myPageColumn: {
    marginBottom: 20,
  },
});
