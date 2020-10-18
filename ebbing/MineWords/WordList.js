import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const WordList = ({ word }) => {
  return (
    <View style={styles.mineWordList}>
      <View style={styles.mineWordRow}>
        <Text style={styles.text}>{word.word_eng}</Text>
      </View>
      <View style={styles.mineWordRow}>
        <Text style={styles.text}>{word.word_kor}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mineWordList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mineWordRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
  },
});

export default React.memo(WordList);
