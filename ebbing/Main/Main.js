import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
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
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('PriorityWords')}>
          <View style={styles.categoryView}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require('../assets/ellipse1.png')}
            />
            <Text style={styles.categoryText}>우선순위 영단어</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('MineWords')}>
          <View style={styles.categoryView}>
            <Text style={styles.categoryText}>나만의 영단어</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252B39',
    position: 'relative',
  },
  categoryView: {
    marginVertical: 20,
    backgroundColor: '#ffffff',
    width: width,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  categoryText: {
    fontSize: 20,
  },
});
