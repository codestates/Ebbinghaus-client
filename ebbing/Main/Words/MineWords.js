import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ADDRESS from '../../DummyData/Address';

const Address = ADDRESS;

export default class MineWords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      wordList: [],
    };
  }

  // 랜더링시 데이터를 받아옴
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getMineWordList();
    });
  }

  async deleteBtn(data) {
    let result = [];
    let userId = await AsyncStorage.getItem('userId');

    try {
      data.forEach((element) => {
        if (element.isSelect === true) {
          result.push(element);
        }
      });

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
      fetch(`${Address}/word/mine/delete`, options).then(() => {
        this.getMineWordList();
      });
    } catch (e) {
      console.error(e);
    }
  }

  // Data를 받아오기 위해 서버에 요청하는 곳
  //데이터를 받아올 때 상태값으로 isSelect과 selectedClass 를 넣어줌
  //isSelect 은 item의 선택여부, selectedClass는 그에 따른 스타일 변경
  async getMineWordList() {
    this.setState({ loading: true });
    let userId = await AsyncStorage.getItem('userId');

    try {
      const response = await fetch(`${Address}/word/mine/${userId}`);
      const responseJson = await response.json();

      responseJson.map((item) => {
        item.isSelect = false;
        item.selectedClass = styles.list;
        return item;
      });
      this.setState({
        loading: false,
        wordList: responseJson,
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
      ? [styles.selected, styles.white]
      : styles.list;

    const index = this.state.wordList.findIndex(
      (item) => data.item.id === item.id
    );

    this.state.wordList[index] = data.item;

    this.setState({
      wordList: this.state.wordList,
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

        await fetch(`${Address}/word/mine/test-register`, options);
        this.getMineWordList();
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
      <View style={styles.WordRow}>
        <Text style={[styles.text, data.item.selectedClass]}>
          {data.item.word_eng}
        </Text>
      </View>
      <View style={styles.WordRow}>
        <Text style={[styles.text, data.item.selectedClass]}>
          {data.item.word_kor}
        </Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    const itemNumber = this.state.wordList.filter((item) => item.isSelect)
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
        <View>
          <Text style={[styles.tilteFont, styles.white]}>나만의 단어장</Text>
        </View>
        <View style={styles.header}>
          <View>
            <TouchableOpacity
              onPress={() => this.deleteBtn(this.state.wordList)}
            >
              <MaterialCommunityIcons
                name="trash-can"
                color={'#ff0000'}
                size={30}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('RegisterWords')}
            >
              <AntDesign name="pluscircleo" color={'#fff'} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.wordList.length !== 0 ? (
          <FlatList
            style={styles.Words}
            data={this.state.wordList}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={(item) => this.renderItem(item)}
            keyExtractor={(item) => item.id.toString()}
            extraData={this.state}
          />
        ) : (
          <View style={styles.box}>
            <Text>현재 등록된 단어가 없습니다.</Text>
            <Text><AntDesign name="pluscircleo" color={'#000'} size={15} /> 버튼을 눌러서 단어를 등록해 주세요.</Text>
            <Text></Text>
          </View>
        )}
        <View style={styles.buttonSpace}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('MineWordsFilter')}
          >
            <Text style={styles.white}>Test중인 단어 보기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.goToTest(this.state.wordList);
            }}
          >
            <Text style={styles.white}>{itemNumber} 개 Test 등록</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const { height, width } = Dimensions.get('window');
const standardWidth = width * 0.85;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#252B39',
  },
  tilteFont: {
    fontSize: 20,
    color: '#fff',
    marginTop: 40,
    margin: 20,
  },
  Words: {
    backgroundColor: '#ffffff',
    width: standardWidth,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.75,
    paddingBottom: 7,
  },
  white: {
    color: '#fff',
  },
  button: {
    width: standardWidth,
    height: height * 0.07,
    borderRadius: 15,
    backgroundColor: '#99D7ED',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: -1,
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  selected: { backgroundColor: '#99D7ED' },
  between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    paddingTop: 10,
  },
  WordRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    padding: 10,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: '#000',
  },
  box: {
    width: standardWidth,
    height: height * 0.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSpace: {
    justifyContent: 'space-evenly',
    height: height * 0.2,
  },
});
