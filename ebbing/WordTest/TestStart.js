import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
          <AntDesign name="play" size={70} />
          <Text>단어 시험</Text>
          <Text>Start</Text>
        </TouchableOpacity>
        <View>
          <Image
            style={{ width: 400, height: 300 }}
            source={{
              url:
                'https://media1.giphy.com/media/M9TbsVzWI8YAEEJJ5u/giphy.gif',
            }}
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
  },
  goToTestBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: goToTestBoxWith,
    height: height - 500,
  },
});
