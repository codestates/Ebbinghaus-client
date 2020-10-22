import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.main}>
        <View style={styles.wordColumn}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PriorityWords')}
          >
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>우선순위 영단어</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MineWords')}>
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>나만의 영단어</Text>
            </View>
          </TouchableOpacity>
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
