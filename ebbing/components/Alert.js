import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: '#71AE55',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleCorrect: {
    backgroundColor: '#83B96B',
  },
  icon: {
    width: screen.width / 1.5,
  },
});

export const Alert = ({ correct, visible }) => {
  if (!visible) return null;

  const icon = correct
    ? require('../assets/testCheck.png')
    : require('../assets/close.png');

  const circleStyles = [styles.circle];

  if (correct) {
    circleStyles.push(styles.circleCorrect);
  }

  return (
    <View style={styles.container}>
      <View style={circleStyles}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </View>
    </View>
  );
};
