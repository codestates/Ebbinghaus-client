import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import Signup from './Signup';
import Main from './Main';
import PriorityWords from './PriorityWords/PriorityWords';
import MineWords from './MineWords/MineWords';
import RegisterWords from './RegisterWords';
import Test from './Test';
import Mypage from './MyPage';

const MainStack = createStackNavigator();
const TestStack = createStackNavigator();
const LoginStack = createStackNavigator();
const MyPageStack = createStackNavigator();

export function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Main" component={Main} />
      <MainStack.Screen name="PriorityWords" component={PriorityWords} />
      <MainStack.Screen name="MineWords" component={MineWords} />
      <MainStack.Screen name="RegisterWords" component={RegisterWords} />
    </MainStack.Navigator>
  );
}

export function TestStackScreen() {
  return (
    <TestStack.Navigator>
      <TestStack.Screen name="Test" component={Test} />
      <TestStack.Screen name="Main" component={Main} />
    </TestStack.Navigator>
  );
}

export function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="Signup" component={Signup} />
      <LoginStack.Screen name="Main" component={Main} />
    </LoginStack.Navigator>
  );
}

export function MyPageStackScreen() {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen name="Mypage" component={Mypage} />
      <MyPageStack.Screen name="Signup" component={Signup} />
      <MyPageStack.Screen name="Main" component={Main} />
    </MyPageStack.Navigator>
  );
}
