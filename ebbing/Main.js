import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';

export default class Main extends React.Component {
  render() {
    return (
      <ScrollView style={styles.main}>
        <View style={styles.wordColumn}>
          <View style={styles.categoryView}>
            <Text style={styles.categoryText}>우선순위 영단어</Text>
          </View>
          <View style={styles.categoryView}>
            <Text style={styles.categoryText}>나만의 영단어</Text>
          </View>
        </View>
        <View style={styles.wordColumn}>
          <View style={styles.categoryView}>
            <Text style={styles.categoryText}>토익</Text>
          </View>
          <View style={styles.categoryView}>
            <Text style={styles.categoryText}>여행</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#000000',
  },
  wordColumn: {
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  categoryView: {
    marginVertical: 20,
    backgroundColor: '#ffffff',
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 20,
  },
});
