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
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
const { height, width } = Dimensions.get('window');

export default function MyPage() {
  const [today, setToday] = React.useState(0);
  const [doing, setDoing] = React.useState(0);
  const [finish, setFinish] = React.useState(0);
  const { signOut } = React.useContext(AuthContext);

  React.useEffect(() => {
    const userToday = async () => {
      let userId = await AsyncStorage.getItem('userId');
    
      try {
        const response = await fetch(`${Address}/user/todaytesting/${userId}`);
        const responseJson = await response.json();
    
        setToday({
          today: responseJson,
        });
      } catch (e) {
        console.error(e);
      }
    };

    const userDoing = async () => {
      let userId = await AsyncStorage.getItem('userId');
    
      try {
        const response = await fetch(`${Address}/user/beingtested/${userId}`);
        const responseJson = await response.json();
    
        setDoing({
          today: responseJson,
        });
      } catch (e) {
        console.error(e);
      }
    };

    const userFinish = async () => {
      let userId = await AsyncStorage.getItem('userId');
    
      try {
        const response = await fetch(`${Address}/user/donetested/${userId}`);
        const responseJson = await response.json();
    
        setFinish({
          today: responseJson,
        });
      } catch (e) {
        console.error(e);
      }
    };
    userToday();
    userDoing();
    userFinish();
  });


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
            <Text>Today {today}</Text>
          </View>
          <View style={styles.myPageColumn}>
            <Text>Doing {doing}</Text>
          </View>
          <View style={styles.myPageColumn}>
            <Text>Finish {finish}</Text>
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
