import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Linking,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
export class Details extends Component {
  constructor() {
    super();
    this.state = {
      details: {},
      overviewtab: true,
      cast: [],
      recommendation: [],
      socialmedia: {},
      photos: [],
    };
  }
  componentDidMount() {
    const {id} = this.props.route.params;
    this.mounted = true;
    this._fetchdetails(id);
    this._fetchcast(id);
    this._fetchrecommendation(id);
    // this._fetchsocialmedia(id);
    this._fetchphotos(id);
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  _fetchdetails = id => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=633ec42816ec106d78a7b9185d169896&language=en-US`,
    )
      .then(res => res.json())
      .then(data => this.mounted == true && this.setState({details: data}));
  };
  _fetchcast = id => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=633ec42816ec106d78a7b9185d169896&language=en-US`,
    )
      .then(res => res.json())
      .then(data => this.mounted == true && this.setState({cast: data}));
  };
  _fetchrecommendation = id => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=633ec42816ec106d78a7b9185d169896&language=en-US&page=1`,
    )
      .then(res => res.json())
      .then(
        data => this.mounted == true && this.setState({recommendation: data}),
      );
  };
  // _fetchsocialmedia = id => {
  //   fetch(
  //     `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=633ec42816ec106d78a7b9185d169896`,
  //   )
  //     .then(res => res.json())
  //     .then(data => this.setState({socialmedia: data}));
  // };
  _fetchphotos = id => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=633ec42816ec106d78a7b9185d169896&include_image_language=null`,
    )
      .then(res => res.json())
      .then(
        data =>
          this.mounted == true &&
          this.setState({photos: data.posters.slice(0, 15)}),
      );
  };

  render() {
    const {watchlist} = this.props;
    const {details, overviewtab, cast, recommendation, socialmedia, photos} =
      this.state;
    // console.log(details);
    const imglink = 'https://image.tmdb.org/t/p/w500';
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          blurRadius={10}
          style={{flex: 1}}
          source={{uri: `${imglink}${details.poster_path}`}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{position: 'absolute', left: 10}}>
              <Ionicons name="chevron-back-sharp" size={25} color="white" />
            </TouchableOpacity>
            <Text style={{color: 'white', fontSize: 20}}>Details</Text>
          </View>
          <ScrollView>
            <View style={styles.maincontainer}>
              <View style={styles.whitecontainer}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={styles.image}
                    source={{uri: `${imglink}${details.poster_path}`}}
                  />
                  <View style={styles.scorebox}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      Score
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}>
                      {details.vote_average}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 15,
                      flex: 1,
                      marginTop: 50,
                      paddingRight: 10,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}>
                      {details.title}
                    </Text>
                    <Text style={{color: 'grey'}}>
                      {details.release_date
                        ? details.release_date.slice(0, 4)
                        : details.release_date}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginVertical: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  {details.homepage != '' ? (
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(`${details.homepage}`);
                      }}
                      style={styles.websitebutton}>
                      <Feather name="globe" size={20} color="white" />
                      <Text style={{color: 'white', marginLeft: 10}}>
                        Website
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        ToastAndroid.show(
                          'There is no website available',
                          ToastAndroid.SHORT,
                        );
                      }}
                      style={styles.addwatchlist}>
                      <Feather name="x" size={20} color="black" />
                      <Text style={{color: 'black', marginLeft: 10}}>
                        Website
                      </Text>
                    </TouchableOpacity>
                  )}
                  {watchlist.filter(value => {
                    return value.id == details.id;
                  }).length < 1 ? (
                    <TouchableOpacity
                      onPress={() => {
                        details.id != null &&
                          this.props.add({
                            id: details.id,
                            title: details.title,
                            uri: `${imglink}${details.poster_path}`,
                          });
                        // console.log(this.props.watchlist);
                      }}
                      style={styles.addwatchlist}>
                      <Entypo name="plus" size={20} color="black" />
                      <Text style={{color: 'black', marginLeft: 10}}>
                        Watch List
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.delete(details.id);
                        // console.log(this.props.watchlist);
                      }}
                      style={styles.addedtowatchlist}>
                      <Entypo name="check" size={20} color="white" />
                      <Text style={{color: 'white', marginLeft: 10}}>
                        Watch List
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                  flexDirection: 'row',
                  marginTop: 25,
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.mounted == true && this.setState({overviewtab: true})
                  }
                  style={{
                    ...styles.taboverviewphotos,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    backgroundColor:
                      overviewtab == true ? '#00CD6F' : 'transparent',
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: overviewtab != true ? '#00CD6F' : 'white',
                    }}>
                    Overview
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.mounted == true && this.setState({overviewtab: false})
                  }
                  style={{
                    ...styles.taboverviewphotos,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    backgroundColor:
                      overviewtab != true ? '#00CD6F' : 'transparent',
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: overviewtab == true ? '#00CD6F' : 'white',
                    }}>
                    Photos
                  </Text>
                </TouchableOpacity>
              </View>
              {overviewtab == true ? (
                <View>
                  <View style={{marginHorizontal: 18, flexDirection: 'row'}}>
                    {details.genres &&
                      details.genres.map((item, index) => {
                        return (
                          <Text style={{color: '#00CD6F'}} key={index}>
                            {item.name}
                            {index < details.genres.length - 1 ? ', ' : ''}
                          </Text>
                        );
                      })}
                  </View>
                  <View style={{marginHorizontal: 18, marginTop: 25}}>
                    <Text style={{color: 'white', fontSize: 25}}>Synopsis</Text>
                    <Text style={{color: 'grey'}}>{details.overview}</Text>
                  </View>
                  <View style={{marginHorizontal: 18, marginTop: 25}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{color: 'white', fontSize: 25}}>Cast</Text>
                      <Text
                        onPress={() => {
                          details.homepage == ''
                            ? ToastAndroid.show(
                                'There is no website available',
                                ToastAndroid.SHORT,
                              )
                            : Linking.openURL(`${details.homepage}`);
                        }}
                        style={{color: '#00CD6F', fontSize: 15}}>
                        view all
                      </Text>
                    </View>
                    <ScrollView
                    horizontal={true}
                      style={{
                        // flexDirection: 'row',
                        // alignItems: 'center',
                        // justifyContent: 'space-around',
                        }}>
                      {cast.cast &&
                        cast.cast
                          .map((item, index) => {
                            return (
                              <View key={index} style={{marginRight:20}}>
                                <Image
                                  style={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 60 / 2,
                                  }}
                                  source={{
                                    uri:
                                      item.profile_path != null
                                        ? `${imglink}${item.profile_path}`
                                        : `https://www.clipartmax.com/png/full/83-836460_pedro-gaytan-treasurer-and-patient-board-member-mr-profile-logo-no-background.png`,
                                  }}></Image>
                                <Text style={{color: 'grey'}}>
                                  {item.name.slice(0, 8)}..
                                </Text>
                              </View>
                            );
                          })}
                    </ScrollView>
                  </View>
                  <View
                    style={{
                      marginHorizontal: 18,
                      marginTop: 25,
                      marginBottom: 25,
                    }}>
                    <Text style={{color: 'white', fontSize: 25}}>
                      Recommendation
                    </Text>
                    <ScrollView horizontal={true}>
                      {recommendation.results &&
                        recommendation.results.map((item, index) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              style={{marginRight: 5}}
                              activeOpacity={0.5}
                              onPress={() => {
                                this._fetchdetails(item.id);
                                this._fetchcast(item.id);
                                this._fetchrecommendation(item.id);
                                //this._fetchsocialmedia(item.id);
                                this._fetchphotos(item.id);
                              }}>
                              <Image
                                style={{
                                  borderRadius: 10,
                                  height: 200,
                                  width: 150,
                                }}
                                source={{uri: `${imglink}${item.poster_path}`}}
                              />
                            </TouchableOpacity>
                          );
                        })}
                    </ScrollView>
                  </View>
                </View>
              ) : (
                <View>
                  <ScrollView horizontal={true}>
                    {photos &&
                      photos.map((item, index) => {
                        return (
                          <Image
                            key={index}
                            style={{
                              borderRadius: 10,
                              height: 200,
                              width: 150,
                              marginLeft: 8,
                              marginBottom: 10,
                            }}
                            source={{uri: `${imglink}${item.file_path}`}}
                          />
                        );
                      })}
                  </ScrollView>
                </View>
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.5,
    flexDirection: 'row',
  },
  maincontainer: {
    backgroundColor: '#122034',
    borderRadius: 5,
    marginTop: 40,
  },
  whitecontainer: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  scorebox: {
    position: 'absolute',
    height: 55,
    width: 55,
    backgroundColor: '#DFBF21',
    borderRadius: 5,
    right: 18,
    top: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 10,
    marginLeft: 15,
    marginTop: -25,
    height: 200,
    width: 150,
  },
  websitebutton: {
    height: 48,
    width: '40%',
    backgroundColor: '#00CD6F',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 20,
  },
  addwatchlist: {
    height: 48,
    backgroundColor: 'white',
    width: '40%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 20,
  },
  addedtowatchlist: {
    height: 48,
    backgroundColor: '#00CD6F',
    width: '40%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 20,
  },
  taboverviewphotos: {
    width: '50%',
    height: 30,
    borderColor: '#00CD6F',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
export default connect(mapStateToProps, mapDispatchToProps)(Details);
