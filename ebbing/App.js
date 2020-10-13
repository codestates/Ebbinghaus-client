import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PriorityWords from './PriorityWords/PriorityWords'
import Main from './Main'
import MineWords from './MineWords/MineWords';


export default function App() {
  return (
  <PriorityWords />
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
