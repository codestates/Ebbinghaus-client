import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { AuthContext } from './AppContext';
import AsyncStorage from '@react-native-community/async-storage';
import ADDRESS from './DummyData/Address';

const Address = ADDRESS;
const { height, width } = Dimensions.get('window');

export default function MyPage() {
  const [today, setToday] = React.useState(0);
  const [doing, setDoing] = React.useState(0);
  const [finish, setFinish] = React.useState(0);
  const [id, setId] = React.useState(null);
  const { signOut } = React.useContext(AuthContext);

  async function returnOptions() {
    let accessToken = await AsyncStorage.getItem('accessToken');
    let options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
    };
    return options;
  }

  React.useEffect(() => {
    const userToday = async () => {
      try {
        let options = await returnOptions();
        const response = await fetch(`${Address}/user/todaytesting`, options);
        const responseJson = await response.json();
        setToday(responseJson[0]);
        setId(responseJson[1]);
      } catch (e) {
        console.error(e);
      }
    };

    const userDoing = async () => {
      try {
        let options = await returnOptions();
        const response = await fetch(`${Address}/user/beingtested`, options);
        const responseJson = await response.json();

        setDoing(responseJson[0]);
      } catch (e) {
        console.error(e);
      }
    };

    const userFinish = async () => {
      try {
        let options = await returnOptions();
        const response = await fetch(`${Address}/user/donetested`, options);
        const responseJson = await response.json();

        setFinish(responseJson[0]);
      } catch (e) {
        console.error(e);
      }
    };
    userToday();
    userDoing();
    userFinish();
  }, [today, doing, finish]);

  return (
    <View style={styles.myPage}>
      <View style={styles.myPageBox}>
        <View style={styles.myPageBoxInner}>
          <View style={[styles.idColumn, styles.myPageColumn]}>
            <View>
              <Text>ID {id}</Text>
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
