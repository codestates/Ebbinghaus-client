import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import Menu from './Main/Menu';
import { LoginStackScreen } from './StackScreen';
import { AuthContext } from './AppContext';
import ADDRESS from './DummyData/Address';
import { acc } from 'react-native-reanimated';
//import * as Google from 'expo-google-app-auth';
//import ClientID from './DummyData/ClientID';

const Stack = createStackNavigator();
const Address = ADDRESS;

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            accessToken: action.token,
            // accessToken: 'hihi',
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            accessToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            accessToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      accessToken: null,
    }
  );

  React.useEffect(() => {
    // 저장소에서 토큰을 가져온 다음 적절한 위치로 이동합니다.
    const bootstrapAsync = async () => {
      let accessToken;

      try {
        accessToken = await AsyncStorage.getItem('accessToken');
        console.log('유저 토큰 값은 : ', accessToken);
      } catch (e) {
        // 토큰 복원 실패
      }
      // 토큰을 복원 한 후 프로덕션 앱에서 유효성을 검사해야 할 수 있습니다.

      // 앱 화면 또는 인증 화면으로 전환되며이 로딩
      // 화면이 마운트 해제되고 버려집니다.
      dispatch({ type: 'RESTORE_TOKEN', token: accessToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // 프로덕션 앱에서 일부 데이터 (일반적으로 사용자 이름, 비밀번호)를 서버로 보내고 토큰을 가져와야합니다.
        // 로그인이 실패한 경우에도 오류를 처리해야합니다.
        // 토큰을 얻은 후 ʻAsyncStorage`를 사용하여 토큰을 유지해야합니다.
        //이 예에서는 더미 토큰을 사용합니다.

        let options = {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${state.accessToken}`,
          },
          credentials: 'include',
          body: JSON.stringify({
            name: data.username,
            password: data.password,
          }),
        };

        try {
          let response = await fetch(`${Address}/user/signin`, options);
          console.log('response==: ', response);
          let responseOK = response && response.ok;
          if (responseOK) {
            let result = await response.json();
            console.log('서버에서 보내온 result ', result);
            AsyncStorage.setItem('accessToken', result.accessToken);
            AsyncStorage.setItem('userId', String(result.id));
            dispatch({ type: 'SIGN_IN', token: result.accessToken });
          } else {
            console.log('요청 실패');
          }
        } catch (e) {
          console.error(e);
        }
      },
      signOut: async (data) => {
        let accessToken = await AsyncStorage.getItem('accessToken');

        let options = {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include',
        };

        await AsyncStorage.removeItem('accessToken');
        await fetch(`${Address}/user/signout`, options);
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        // 프로덕션 앱에서는 사용자 데이터를 서버로 보내고 토큰을 가져와야합니다.
        // 가입이 실패한 경우에도 오류를 처리해야합니다.
        // 토큰을 얻은 후 ʻAsyncStorage`를 사용하여 토큰을 유지해야합니다.
        //이 예에서는 더미 토큰을 사용합니다.

        let options = {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${state.accessToken}`,
          },
          credentials: 'include',
          body: JSON.stringify({
            name: data.username,
            password: data.password,
          }),
        };

        try {
          let response = await fetch(`${Address}/user/signup`, options);
          let responseOK = response && response.ok;
          if (responseOK) {
            let result = await response.json();
            console.log('서버에서 보내온 result ', result);
            Alert.alert(`${result.name}님 회원가입이 완료되었습니다.`);
          } else {
            Alert.alert(`회원가입에 실패하였습니다.`);
          }
        } catch (e) {
          console.error(e);
        }
      },
      // googleSignIn: async () => {
      //   try {
      //     const googleResult = await Google.logInAsync({
      //       androidClientId: ClientID,
      //       // iosClientId: YOUR_CLIENT_ID_HERE,
      //     });

      //     if (googleResult.type === 'success') {
      //       // return result.accessToken;
      //       // AsyncStorage.setItem('accessToken', result.accessToken);
      //       // AsyncStorage.setItem('userId', String(result.user.name));
      //       console.log('result.accessToken == : ', googleResult.accessToken);
      //       console.log('result.user.name == : ', googleResult.user.name);
      //       console.log('result.user.email == : ', googleResult.user.email);

      //       let options = {
      //         method: 'POST',
      //         mode: 'cors',
      //         headers: {
      //           Accept: 'application/json',
      //           'Content-Type': 'application/json',
      //           authorization: `Bearer ${state.accessToken}`,
      //         },
      //         credentials: 'include',
      //         body: JSON.stringify({
      //           name: googleResult.user.name,
      //         }),
      //       };

      //       let response = await fetch(`${Address}/user/signin`, options);
      //       console.log('response==: ', response);
      //       let responseOK = response && response.ok;
      //       if (responseOK) {
      //         let result = await response.json();
      //         console.log('서버에서 보내온 result ', result);
      //         AsyncStorage.setItem('accessToken', googleResult.accessToken);
      //         AsyncStorage.setItem('userId', String(googleResult.user.name));
      //         dispatch({ type: 'SIGN_IN', token: googleResult.accessToken });
      //       } else {
      //         console.log('요청 실패');
      //       }
      //     } else {
      //       // return { cancelled: true };
      //       console.log('cancelled');
      //     }
      //   } catch (e) {
      //     // return { error: true };
      //     console.log('error', e);
      //   }
      // },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.accessToken !== null ? (
            <Stack.Screen name="Login" component={LoginStackScreen} />
          ) : (
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
