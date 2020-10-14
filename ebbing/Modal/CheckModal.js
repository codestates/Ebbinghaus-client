import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Modal } from 'react-native';
import { Constants } from 'expo';

export default class CheckModal extends Component {
  state = {
    modalVisible: false,
  };

  _handleButtonPress = () => {
    this.setModalVisible(true);
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <TouchableOpacity
            style={[styles.container, styles.modalBackgroundStyle]}
            onPress={this.setModalVisible.bind(this, false)}
          >
            <View style={styles.innerContainerTransparentStyle}>
              <Text>This is a modal</Text>
              <Button
                title="close"
                onPress={this.setModalVisible.bind(this, false)}
              />
            </View>
          </TouchableOpacity>
        </Modal>
        <Button title="Press me" onPress={this._handleButtonPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  modalBackgroundStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainerTransparentStyle: {
    backgroundColor: '#fff',
    padding: 20,
  },
});
