import React, { Component } from 'react';
import { Button, FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class MineWords extends Component {
  constructor(props) {
    super(props);
  }

  onClickListener = (viewId) => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
        <Text style={styles.white}>우선영어단어장</Text>
        <TouchableOpacity style={styles.box}><Text>등록 단어</Text></TouchableOpacity>
        </View>
        <FlatList
          style={styles.Words}
          data={[
            { key: 'Devin' },
            { key: 'Dan' },
            { key: 'Dominic' },
            { key: 'Jackson' },
            { key: 'James' },
            { key: 'Joel' },
            { key: 'John' },
            { key: 'Jillian' },
            { key: 'Jimmy' },
            { key: 'Julie' },
            { key: 'Devin1' },
            { key: 'Dan1' },
            { key: 'Dominic1' },
            { key: 'Jackson1' },
            { key: 'James1' },
            { key: 'Joel1' },
            { key: 'John1' },
            { key: 'Jillian1' },
            { key: 'Jimmy1' },
            { key: 'Julie1' },
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
        />
        <View style={styles.title}>
        <View><TouchableOpacity style={styles.box}><Text>단어 등록</Text></TouchableOpacity></View>     
        <View><TouchableOpacity style={styles.box}><Text>Test 등록</Text></TouchableOpacity></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  Words: {
    backgroundColor: '#ffffff',
    width: 300,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    paddingBottom: 7,
  },
  white: {
    color: '#fff'
  },
  box: {
    width: 80,
    height: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    marginTop: 10,
    marginLeft: 200
  }
});
