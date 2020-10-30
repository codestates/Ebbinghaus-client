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
import ADDRESS, { bold } from './DummyData/Address';
import Entypo from 'react-native-vector-icons/Entypo';
import { color } from 'react-native-reanimated';

const Address = ADDRESS;
const { height, width } = Dimensions.get('window');

export default function MyPage({ navigation }) {
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
    navigation.addListener('focus', () => {
      userToday();
      userDoing();
      userFinish();
    });
  }, [today, doing, finish]);

  return (
    <View style={styles.myPage}>
      <View>
        <Text style={[styles.id]}>{id}</Text>
      </View>
      <View style={styles.myPageBox}>
        <View style={[styles.myPageBoxInner, styles.todayBox]}>
          <View style={[styles.idColumn, styles.myPageColumn]}>
            <Text style={[styles.today, styles.todo]}>오늘의 테스트</Text>
            <Text style={[styles.today, styles.text]}> {today} 단어 </Text>
          </View>
        </View>
        {/* //1 */}
        <View style={[styles.myPageBoxInner, styles.doingBox]}>
          <View style={[styles.idColumn, styles.myPageColumn]}>
            <Text style={[styles.doing, styles.todo]}>현재 하고있는 </Text>
            <Text style={[styles.text]}> {doing} 단어</Text>
          </View>
        </View>
        {/* //2*/}
        <View style={[styles.myPageBoxInner, styles.finishBox]}>
          <View style={[styles.idColumn, styles.myPageColumn]}>
            <Text style={[styles.finish, styles.todo]}>끝난</Text>
            <Text style={[styles.text]}>{finish} 단어</Text>
          </View>
        </View>
        {/* //3*/}
        <View style={[styles.myPageBoxInner, styles.logOutBox]}>
          <View style={[styles.idColumn, styles.myPageColumn]}>
            <View>
              <TouchableOpacity onPress={() => signOut()}>
                <Entypo
                  name="log-out"
                  color={'#fff'}
                  size={30}
                  style={{ textAlign: 'center', marginBottom: '-5%' }}
                />
                <Text style={{ color: '#fff', paddingTop: '5%' }}>
                  로그아웃
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* //4*/}
      </View>
    </View>
  );
}

const myPageBoxWith = width;
const styles = StyleSheet.create({
  myPage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252B39',
  },
  myPageBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: myPageBoxWith,
    height: height - 1000,
    width: width - 500,
  },
  myPageBoxInner: {
    width: myPageBoxWith - 40,
    height: height - 700,
    width: width - 250,
    flexBasis: '40%',
    alignItems: 'center',
    marginBottom: '5%',
    margin: '5%',
    borderRadius: 10,
    color: '#fff',
    fontWeight: 'bold',
  },

  idColumn: {
    padding: '10%',
    alignItems: 'center',
    width: myPageBoxWith - 40,
  },
  myPageColumn: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  id: {
    fontSize: 30,
    fontWeight: 'normal',
    color: '#fff',
    marginBottom: '10%',
  },

  //
  text: {
    color: '#fff',
    textAlign: 'center',
    margin: '6%',
    fontSize: 20,
  },
  //todo
  todo: {
    color: '#fff',
    fontWeight: 'bold',
    alignContent: 'center',
    fontSize: 18,
  },
  //background color
  todayBox: {
    backgroundColor: '#83B9CC',
  },
  doingBox: {
    backgroundColor: '#A0C1B8',
  },
  finishBox: {
    backgroundColor: '#FFB540',
  },
  logOutBox: {
    justifyContent: 'center',
  },
});
