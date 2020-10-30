import React from 'react';
import { StyleSheet } from 'react-native';
import {
  MainStackScreen,
  TestStackScreen,
  MyPageStackScreen,
} from '../StackScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

export default class Menu extends React.Component {
  render() {
    return (
      <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#99D7ED',
        activeBackgroundColor: '#3A3C3D',
        inactiveBackgroundColor: '#3A3C3D',
        keyboardHidesTabBar: true,
      }}>
        <Tab.Screen
          name="Home"
          component={MainStackScreen}
          options={{
            tabBarLabel: '홈',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="TEST"
          component={TestStackScreen}
          options={{
            tabBarLabel: 'Test',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="school" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="내정보"
          component={MyPageStackScreen}
          options={{
            tabBarLabel: '내정보',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
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
