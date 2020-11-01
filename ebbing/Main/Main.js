import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
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
        <Image
          style={{ width: width, height: 240, opacity: 1 }}
          source={require('../assets/main_bg2.png')}
        />
        <View style={styles.boxSpace}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PriorityWords')}
          >
            <View style={[styles.categoryView, { backgroundColor: '#8bcdcd' }]}>
              <Image
                style={{ width: 80, height: 80 }}
                source={require('../assets/ellipse1.png')}
              />
              <Text style={styles.categoryText}>우선 순위 영단어</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MineWords')}>
            <View style={[styles.categoryView, { backgroundColor: '#a3d2ca' }]}>
              <Image
                style={{ width: 80, height: 80 }}
                source={require('../assets/ellipse2.png')}
              />
              <Text style={styles.categoryText}>나만의 영단어</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'space-between',
    backgroundColor: '#252B39',
    position: 'relative',
  },
  categoryView: {
    marginVertical: 20,
    backgroundColor: '#99D7ED',
    width: width,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 15,
  },
  categoryText: {
    marginLeft: '5%',
    fontSize: 20,
    color: '#fff',
  },
  boxSpace: {
    justifyContent: 'center',
    height: height * 0.65,
  },
});
