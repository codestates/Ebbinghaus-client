import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Menu from './Menu';
import { LoginStackScreen } from './StackScreen';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: null,
    };
  }

  render() {
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

          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
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
      // if (state.isLoading) {
      //   // We haven't finished checking for the token yet
      //   return <SplashScreen />;
      // }
      <NavigationContainer>
        <AuthContext.Provider value={authContext}>
          {this.state.userToken == null ? (
            <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginStackScreen} />
            </Stack.Navigator>
          ) : (
            <Menu />
          )}
        </AuthContext.Provider>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
