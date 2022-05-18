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
  componentDidMount() {
    this.mounted=true
  }
  componentWillUnmount(){
    this.mounted=false
  }
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
      newData.length > 0 && this.mounted==true&&this.setState({searchResult: newData});
    } else {
      this.mounted==true&&this.setState({searchResult: []});
    }
  };
  render() {
    const {watchlist} = this.props;
    const {searchData, searchResult} = this.state;
    const imglink = 'https://image.tmdb.org/t/p/w500';
    // console.log(watchlist);
    return (
      <View style={{flex: 1, backgroundColor: '#122034'}}>
       <View
          style={styles.header}>
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
            placeholderTextColor={'grey'}
            placeholder="Search Watchlist"
            style={styles.searchbar}
            value={searchData}
            onChangeText={value => {
              this._listsearch(value);
              this.mounted==true&&this.setState({searchData: value});
            }}
          />
        </View>
        {watchlist.length > 0||searchResult.length > 0?<FlatList
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
        />:<View style={{justifyContent:'center',alignItems:'center',flex:1}}><Image style={{height:300,width:300}} source={require('../../assets/atoms/ae8ac2fa217d23aadcc913989fcc34a2-removebg-preview.png')}></Image></View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
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
  },
  searchbar:{
    backgroundColor: 'white',
    width: '80%',
    color: 'dimgrey',
    opacity: 0.8,
    borderRadius: 15,
    height: 45,
    marginLeft: 10,marginBottom:10
  }
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
