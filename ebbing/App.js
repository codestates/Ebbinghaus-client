import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Menu from './Menu';
import { LoginStackScreen } from './StackScreen';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { AuthContext } from './AppContext';
// require('dotenv').config();

const Stack = createStackNavigator();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    // 저장소에서 토큰을 가져온 다음 적절한 위치로 이동합니다.
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        console.log('유저토큰이 있다! 토큰 값은 : ', userToken);
      } catch (e) {
        // Restoring token failed
        // 토큰 복원 실패
      }

      // After restoring token, we may need to validate it in production apps
      // 토큰을 복원 한 후 프로덕션 앱에서 유효성을 검사해야 할 수 있습니다.

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      // 앱 화면 또는 인증 화면으로 전환되며이 로딩
      // 화면이 마운트 해제되고 버려집니다.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        // 프로덕션 앱에서 일부 데이터 (일반적으로 사용자 이름, 비밀번호)를 서버로 보내고 토큰을 가져와야합니다.
        // 로그인이 실패한 경우에도 오류를 처리해야합니다.
        // 토큰을 얻은 후 ʻAsyncStorage`를 사용하여 토큰을 유지해야합니다.
        //이 예에서는 더미 토큰을 사용합니다.

        // handleLogin() {
        // //   axios
        // //     .post("https://devyeon.com/users/login", this.state)
        // //     .then((res) => {
        // //       if (res.status === 200) {
        // //         if (res.data.token) {
        // //           this.props.getUserData(res.data);
        // //           this.props.handleLoginClick();
        // //         }
        // //       }
        // //     })
        // //     .catch(() => alert("정보를 다시 확인해주세요"));
        // // }
        // // console.log(process.env.REQUEST_ADDRESS);
        // let options = {
        //   method: 'POST',
        //   mode: 'cors',
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json;charset=UTF-8',
        //   },
        //   body: JSON.stringify({
        //     name: data.username,
        //     password: data.password,
        //   }),
        // };
        // let response = await fetch(
        //   `http://localhost:4000/user/signin`,
        //   options
        // );
        // let responseOK = response && response.ok;
        // if (responseOK) {
        //   let result = response.json();
        //   console.log('서버에서 보내온 name ', result.name);
        //   dispatch({ type: 'SIGN_IN', token: result.name + '토큰' });
        // } else {
        //   console.log('망했다');
        // }

         dispatch({ type: 'SIGN_IN', token: data.username + '토큰' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        // 프로덕션 앱에서는 사용자 데이터를 서버로 보내고 토큰을 가져와야합니다.
        // 가입이 실패한 경우에도 오류를 처리해야합니다.
        // 토큰을 얻은 후 ʻAsyncStorage`를 사용하여 토큰을 유지해야합니다.
        //이 예에서는 더미 토큰을 사용합니다.

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
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
          ) : state.userToken == null ? (
            <Stack.Screen name="Login" component={LoginStackScreen} />
          ) : (
            <Stack.Screen name="Menu" component={Menu} />
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
