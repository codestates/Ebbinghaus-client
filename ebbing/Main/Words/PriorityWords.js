import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//require('dotenv').config();
const Address = 'http://localhost:4000';
//const Address = 'http://13.125.184.203:4000';
//let Address = process.env.ADDRESS

export default class PriorityWords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      dataSource: [],
      filter: false,
    };
  }

  // 랜더링시 데이터를 받아옴
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.fetchData();
    });
  }

  // Data를 받아오기 위해 서버에 요청하는 곳
  //데이터를 받아올 때 상태값으로 isSelect과 selectedClass 를 넣어줌
  //isSelect 은 item의 선택여부, selectedClass는 그에 따른 스타일 변경
  async fetchData() {
    this.setState({ loading: true });
    let userId = await AsyncStorage.getItem('userId');

    try {
      const response = await fetch(`${Address}/word/priority/${userId}`);
      const responseJson = await response.json();

      responseJson.map((item) => {
        item.isSelect = false;
        item.selectedClass = styles.list;
        return item;
      });
      this.setState({
        loading: false,
        dataSource: responseJson,
      });
    } catch (e) {
      console.error(e);
      this.setState({ loading: false });
    }
  }

  async registerFetchData() {
    this.setState({ loading: true });
    let userId = await AsyncStorage.getItem('userId');

    try {
      const response = await fetch(`${Address}/word/priority/button/${userId}`);
      const responseJson = await response.json();

      responseJson.map((item) => {
        item.isSelect = false;
        item.selectedClass = styles.list;
        return item;
      });
      this.setState({
        loading: false,
        dataSource: responseJson,
      });
    } catch (e) {
      console.error(e);
      this.setState({ loading: false });
    }
  }

  //List의 사이사이 빈 공간
  FlatListItemSeparator = () => <View style={styles.line} />;

  //item의 선택에 대한 함수
  //선택에 따른 스타일 변경 및
  selectItem = (data) => {
    data.item.isSelect = !data.item.isSelect;
    data.item.selectedClass = data.item.isSelect
      ? styles.selected
      : styles.list;

    const index = this.state.dataSource.findIndex(
      (item) => data.item.id === item.id
    );

    this.state.dataSource[index] = data.item;

    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  async goToTest(data) {
    let result = [];
    let userId = await AsyncStorage.getItem('userId');

    try {
      data.forEach((element) => {
        if (element.isSelect) {
          result.push(element);
        }
      });

      if (result.length > 0) {
        let options = {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
          credentials: 'include',
          body: JSON.stringify({
            selectedWords: [...result],
            id: userId,
          }),
        };

        await fetch(`${Address}/word/priority/test-register`, options);
        this.fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  }

  renderItem = (data) => (
    <TouchableOpacity
      style={[styles.list, data.item.selectedClass]}
      onPress={() => this.selectItem(data)}
    >
      <Text style={styles.lightText}>
        {data.item.word_eng} {data.item.word_kor}
      </Text>
    </TouchableOpacity>
  );

  render() {
    const itemNumber = this.state.dataSource.filter((item) => item.isSelect)
      .length;
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="purple" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.white}>우선영어단어장</Text>
          {this.state.filter ? (
            <TouchableOpacity
              style={styles.box}
              onPress={() => {
                this.fetchData(), this.setState({ filter: false });
              }}
            >
              <Text>Test 진행 단어</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.box}
              onPress={() => {
                this.registerFetchData(), this.setState({ filter: true });
              }}
            >
              <Text>Test 등록전 단어</Text>
            </TouchableOpacity>
          )}
        </View>
        {this.state.dataSource.length !== 0 ? (
          <FlatList
            style={styles.Words}
            data={this.state.dataSource}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={(item) => this.renderItem(item)}
            keyExtractor={(item) => item.id.toString()}
            extraData={this.state}
          />
        ) : (
          <Text style={styles.Words}>현재 등록된 단어가 없습니다.</Text>
        )}
        <View style={styles.right}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => this.goToTest(this.state.dataSource)}
          >
            <Text>{itemNumber}개 Test 등록</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  Words: {
    backgroundColor: '#ffffff',
    width: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    paddingBottom: 7,
  },
  white: {
    color: '#fff',
  },
  box: {
    width: 110,
    height: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    marginTop: 10,
    marginLeft: 180,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  list: {
    paddingVertical: 5,
    margin: 2,
    flexDirection: 'row',
    backgroundColor: '#192338',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: -1,
  },
  lightText: {
    color: '#f7f7f7',
    width: 300,
    paddingLeft: 15,
    fontSize: 20,
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  selected: { backgroundColor: '#FA7B5F' },
});
