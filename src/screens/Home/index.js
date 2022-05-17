/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Linking,
  Dimensions,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class Home extends Component {
  constructor() {
    super();
    this.state = {nowplaying: '', page: 1};
  }
  componentDidMount() {
    const {page} = this.state;
    this.pagenow = 1;
    this._fetchnowplaying(this.pagenow);
  }
  _fetchnowplaying = x => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=633ec42816ec106d78a7b9185d169896&language=en-US&page=${x}`,
    )
      .then(res => res.json())
      .then(data => this.setState({nowplaying: data.results}));
  };
  _next = () => {
    this.pagenow++;
    this._fetchnowplaying(this.pagenow);
  };
  _previous = () => {
    this.pagenow--;
    this._fetchnowplaying(this.pagenow);
  };
  render() {
    // console.log(this.pagenow);
    const {nowplaying, page} = this.state;
    const imglink = 'https://image.tmdb.org/t/p/w500';
    // const genres = {
    //   Adventure: '12',
    //   Fantasy: '14',
    //   Animation: '16',
    //   Drama: '18',
    //   Horror: '27',
    //   Action: '28',
    //   Comedy: '35',
    //   History: '36',
    //   Western: '37',
    //   Thriller: '53',
    //   Crime: '80',
    //   Documentary: '99',
    //   ScienceFiction: '878',
    //   Mystery: '9648',
    //   Music: '10402',
    //   Romance: '10749',
    //   Family: '10751',
    //   War: '10752',
    //   'Action&Adventure': '10759',
    //   Kids: '10762',
    //   News: '10763',
    //   Reality: '10764',
    //   'Sci-Fi&Fantasy': '10765',
    //   Soap: '10766',
    //   Talk: '10767',
    //   'War&Politics': '10768',
    //   TVMovie: '10770',
    // };
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
          {this.pagenow != 1 && (
            <TouchableOpacity
              onPress={() => {
                this._previous();
              }}
              style={{position: 'absolute', left: 10}}>
              <Ionicons name="arrow-back-circle" size={25} color="white" />
            </TouchableOpacity>
          )}
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            Now Playing
          </Text>
          {
            <TouchableOpacity
              onPress={() => {
                this._next();
              }}
              style={{position: 'absolute', right: 10}}>
              <Ionicons name="arrow-forward-circle" size={25} color="white" />
            </TouchableOpacity>
          }
        </View>

        <FlatList
          data={nowplaying}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Details', {id: item.id});
              }}
              style={{
                backgroundColor: 'white',
                height: 200,
                marginTop: 20,
                marginLeft: 30,
                borderRadius: 10,
                flexDirection: 'row',
                marginRight: 10,
              }}>
              <Image
                style={{
                  borderRadius: 10,
                  marginLeft: -20,
                  marginTop: -10,
                  height: 200,
                  width: 150,
                }}
                source={{uri: `${imglink}${item.poster_path}`}}
              />
              <View style={{flex: 1, paddingVertical: 20}}>
                <View
                  style={{
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'dimgrey',
                      fontSize: 17,
                    }}>
                    {item.title}
                  </Text>
                </View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}>
                  {item.overview.slice(0, 70)}...
                </Text>
                <View
                  style={{
                    position: 'absolute',
                    height: 50,
                    width: 50,
                    backgroundColor: '#DFBF21',
                    borderRadius: 5,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Score
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    {item.vote_average}
                  </Text>
                </View>
              </View>
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
