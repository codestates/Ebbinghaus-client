import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { max } from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');

export default class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.test}>
        <View style={styles.examQuestions}>
          <Text>사과</Text>
        </View>
        <View style={styles.multipleChoiceView}>
          <View style={styles.multipleChoiceColumn}>
            <View style={styles.selectAnswer}>
              <Text>mango</Text>
            </View>
            <View style={styles.selectAnswer}>
              <Text>cat</Text>
            </View>
          </View>
          <View style={styles.multipleChoiceColumn}>
            <View style={styles.selectAnswer}>
              <Text>apple</Text>
            </View>
            <View style={styles.selectAnswer}>
              <Text>banana</Text>
            </View>
          </View>
          <View style={styles.multipleChoiceColumn}>
            <View style={styles.selectAnswer}>
              <Text>air</Text>
            </View>
            <View style={styles.selectAnswer}>
              <Text>ace</Text>
            </View>
          </View>
        </View>

        <View style={styles.selectDoView}>
          <View style={styles.selectDo}>
            <Text>건너뛰기</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <View style={styles.selectDo}>
              <Text>그만하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const selectDoHeight = 70;
const styles = StyleSheet.create({
  test: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#000',
    paddingTop: 50,
  },
  examQuestions: {
    width: 280,
    height: 180,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  multipleChoiceView: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 80,
  },
  multipleChoiceColumn: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectAnswer: {
    width: 140,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 0.5,
  },
  selectDoView: {
    width: width,
    height: selectDoHeight,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  selectDo: {
    borderColor: '#000',
    borderWidth: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width / 2,
    height: selectDoHeight,
  },
});
