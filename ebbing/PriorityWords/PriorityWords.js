import React, { Component } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default class PriorityWords extends Component {
  constructor(props) {
    super(props);
  }

  onClickListener = (viewId) => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  };

  render() {
    const DATA = [
      {
        id: '1',
        word_eng: 'apple',
        word_kor: '사과',
      },
      {
        id: '2',
        word_eng: 'banana',
        word_kor: '바나나',
      },
      {
        id: '3',
        word_eng: 'book',
        word_kor: '책',
      },
    ];

    const Item = ({ eng, kor }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{eng}     {kor}</Text>
      </View>
    );

    const renderItem = ({ item }) => <Item eng={item.word_eng} kor={item.word_kor} />;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.white}>우선영어단어장</Text>
          <TouchableOpacity style={styles.box}>
            <Text>등록 단어</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.Words}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.right}>
          <TouchableOpacity style={styles.box}>
            <Text>Test 등록</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    paddingBottom: 7,
  },
  white: {
    color: '#fff',
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
    marginLeft: 200,
  },
  title: {
    fontSize: 20,
  },
});
