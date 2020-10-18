import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default class PriorityWords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      dataSource: [],
      selectData: []
    };
  }

  // 랜더링시 데이터를 받아옴
  componentDidMount() {
    this.fetchData();
  }

  // Data를 받아오기 위해 서버에 요청하는 곳
  //데이터를 받아올 때 상태값으로 isSelect과 selectedClass 를 넣어줌
  //isSelect 은 item의 선택여부, selectedClass는 그에 따른 스타일 변경
  fetchData = () => {
    this.setState({ loading: true });

    let options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      credentials: 'include',
    };

    fetch('http://localhost:4000/word/mine', options)
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson = responseJson.map((item) => {
          item.isSelect = false;
          item.selectedClass = styles.list;
          return item;
        });
        this.setState({
          loading: false,
          dataSource: responseJson,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

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

  goToTest = (data) => {
    let result = [];
    console.log("data1",data)
    data.forEach(element => {
      if (element.isSelect === true) {
        result.push(element)
      }
    });
    console.log("data2",data)

    let options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify({
        array: [...result]
      }),
    };
    fetch('http://localhost:4000/word/mine/test-register', options)
    .then(this.fetchData())
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
          <TouchableOpacity style={styles.box}>
            <Text>등록 단어</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.Words}
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={(item) => this.renderItem(item)}
          keyExtractor={(item) => item.id}
          extraData={this.state}
        />
        <View style={styles.right}>
          <TouchableOpacity style={styles.box} onPress={() => this.goToTest(this.state.dataSource)}>
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
    width: 90,
    height: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    marginTop: 10,
    marginLeft: 200,
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