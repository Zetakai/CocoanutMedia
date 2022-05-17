/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  FlatList,
} from 'react-native';
export class Watchlist extends Component {
  constructor() {
    super();
    this.state = {searchData: '', searchResult: []};
  }
  componentDidMount() {}
  _listsearch = text => {
    const {searchResult} = this.state;
    const {watchlist} = this.props;
    if (text) {
      const newData = watchlist.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      newData.length > 0 && this.setState({searchResult: newData});
    } else {
      this.setState({searchResult: []});
    }
  };
  render() {
    const {watchlist} = this.props;
    const {searchData, searchResult} = this.state;
    const imglink = 'https://image.tmdb.org/t/p/w500';
    // console.log(watchlist);
    return (
      <View style={{flex: 1, backgroundColor: '#122034'}}>
        {/* <ImageBackground
           blurRadius={30}
           style={{flex: 1}}
           source={{
             uri: 'https://png.pngtree.com/background/20210716/original/pngtree-constellation-watercolor-cosmic-mobile-phone-wallpaper-picture-image_1347673.jpg',
           }}> */}
        <View
          style={{
            height: 50,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            borderColor: 'white',
            borderBottomWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            Watchlist
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <TextInput
            placeholderTextColor={'black'}
            placeholder="Search Watchlist"
            style={{
              backgroundColor: 'white',
              width: '80%',
              color: 'black',
              opacity: 0.8,
              borderRadius: 15,
              height: 45,
              marginLeft: 10,
            }}
            value={searchData}
            onChangeText={value => {
              this._listsearch(value);
              this.setState({searchData: value});
            }}
          />
        </View>
        <FlatList
          data={searchResult.length > 0 ? searchResult : watchlist}
          style={{marginHorizontal: 20, marginBottom: 15}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                marginTop: 15,
              }}
              onPress={() => {
                this.props.navigation.navigate('Details', {id: item.id});
              }}>
              <Image
                key={index}
                style={{
                  borderRadius: 10,
                  height: 200,
                  width: 150,
                }}
                source={{uri: `${item.uri}`}}
              />
            </TouchableOpacity>
          )}
        />
        {/* </ImageBackground> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //the styles havent moved here yet
});

const mapStateToProps = state => {
  return {
    watchlist: state.watchlist,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    add: data => {
      dispatch({
        type: 'ADD-WATCHLIST',
        payload: data,
      });
    },
    delete: data => {
      dispatch({
        type: 'DELETE-WATCHLIST',
        payload: data,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
