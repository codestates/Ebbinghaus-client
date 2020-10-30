import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Image,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();

const { height, width } = Dimensions.get('window');

export default class TestStart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.goToTestBox}
          onPress={() => navigation.navigate('Test')}
        >
          <Text style={styles.testText}>TEST START</Text>
          <Image
            style={[styles.testImg]}
            source={require('../assets/test_stat.png')}
          />
        </TouchableOpacity>
        <View>
          <Image
            style={[styles.waveImg, {}]}
            source={require('../assets/wave.gif')}
          />
        </View>
      </View>
    );
  }
}

const goToTestBoxWith = width - 100;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252B39',
    position: 'relative',
  },
  goToTestBox: {
    paddingTop: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: goToTestBoxWith,
    height: height - 500,
  },
  testText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: '5%',
  },
  palyBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: width * -0.1 }, { translateY: height * 0.08 }],
  },
  text: {
    marginTop: '5%',
    left: '-50%',
    transform: [{ translateX: width * 0.1 }],
    color: '#fff',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  testImg: {
    width: 300,
    height: 300,
  },
  waveImg: {
    minWidth: 300,
    maxWidth: 450,
    height: 350,
    bottom: '-20%',
  },
});
