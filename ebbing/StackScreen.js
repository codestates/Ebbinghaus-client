import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './UserSign/Login';
import Signup from './UserSign/Signup';
import Main from './Main/Main';
import PriorityWords from './Main/Words/PriorityWords';
import PriorityWordsFilter from './Main/Words/PriorityWordsFilter';
import MineWords from './Main/Words/MineWords';
import MineWordsFilter from './Main/Words/MineWordsFilter';
import RegisterWords from './Main/Words/RegisterWords';
import TestStart from './WordTest/TestStart';
import Test from './WordTest/Test';
import Mypage from './MyPage';

const MainStack = createStackNavigator();
const TestStack = createStackNavigator();
const LoginStack = createStackNavigator();
const MyPageStack = createStackNavigator();

export function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="PriorityWords"
        component={PriorityWords}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="PriorityWordsFilter"
        component={PriorityWordsFilter}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="MineWords"
        component={MineWords}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="MineWordsFilter"
        component={MineWordsFilter}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="RegisterWords"
        component={RegisterWords}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}

export function TestStackScreen() {
  return (
    <TestStack.Navigator>
      <TestStack.Screen
        name="TestStart"
        component={TestStart}
        options={{ headerShown: false }}
      />
      <TestStack.Screen
        name="Test"
        component={Test}
        options={{ headerShown: false }}
      />
      <TestStack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
    </TestStack.Navigator>
  );
}

export function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
    </LoginStack.Navigator>
  );
}

export function MyPageStackScreen() {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen
        name="Mypage"
        component={Mypage}
        options={{ headerShown: false }}
      />
      <MyPageStack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <MyPageStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </MyPageStack.Navigator>
  );
}
