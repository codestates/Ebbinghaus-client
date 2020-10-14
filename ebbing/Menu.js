import React from 'react';
import { StyleSheet } from 'react-native';
import {
  MainStackScreen,
  TestStackScreen,
  LoginStackScreen,
  MyPageStackScreen,
} from './StackScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default class Menu extends React.Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="내정보" component={MyPageStackScreen} />
        <Tab.Screen name="Login" component={LoginStackScreen} />
        <Tab.Screen name="Home" component={MainStackScreen} />
        <Tab.Screen name="TEST" component={TestStackScreen} />
        {/* <Tab.Screen name="내정보" component={TestStackScreen} /> */}
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
