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
    };
  }
  componentDidMount() {
    const {id} = this.props.route.params;
    this._fetchdetails(id);
    this._fetchcast(id);
    this._fetchrecommendation(id);
    this._fetchsocialmedia(id);
  }
  _fetchdetails = id => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=633ec42816ec106d78a7b9185d169896&language=en-US`,
    )
      .then(res => res.json())
      .then(data => this.setState({details: data}));
  };
  _fetchcast = id => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=633ec42816ec106d78a7b9185d169896&language=en-US`,
    )
      .then(res => res.json())
      .then(data => this.setState({cast: data}));
  };
  _fetchrecommendation = id => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=633ec42816ec106d78a7b9185d169896&language=en-US&page=1`,
    )
      .then(res => res.json())
      .then(data => this.setState({recommendation: data}));
  };
  _fetchsocialmedia = id => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=633ec42816ec106d78a7b9185d169896`,
    )
      .then(res => res.json())
      .then(data => this.setState({socialmedia: data}));
  };

  render() {
    const {watchlist} = this.props;
    const {details, overviewtab, cast, recommendation, socialmedia} =
      this.state;
    //console.log(details);
    const imglink = 'https://image.tmdb.org/t/p/w500';
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          blurRadius={10}
          style={{flex: 1}}
          source={{uri: `${imglink}${details.poster_path}`}}>
          <View
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
              opacity: 0.5,
              flexDirection: 'row',
            }}>
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
            <View
              style={{
                backgroundColor: '#122034',
                borderRadius: 5,
                marginTop: 40,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  marginHorizontal: 10,
                  marginTop: 10,
                  borderRadius: 5,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      borderRadius: 10,
                      marginLeft: 15,
                      marginTop: -25,
                      height: 200,
                      width: 150,
                    }}
                    source={{uri: `${imglink}${details.poster_path}`}}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      height: 55,
                      width: 55,
                      backgroundColor: '#DFBF21',
                      borderRadius: 5,
                      right: 18,
                      top: -20,
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
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(`${details.homepage}`);
                    }}
                    style={{
                      height: 48,
                      width: '40%',
                      backgroundColor: '#00CD6F',
                      borderRadius: 25,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      elevation: 20,
                    }}>
                    <Feather name="globe" size={20} color="white" />
                    <Text style={{color: 'white', marginLeft: 10}}>
                      Website
                    </Text>
                  </TouchableOpacity>
                  {watchlist.filter(value => {
                    return value.id == details.id;
                  }).length < 1 ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.add({
                          id: details.id,
                          title: details.title,
                          uri: `${imglink}${details.poster_path}`,
                        });
                        // console.log(this.props.watchlist);
                      }}
                      style={{
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
                      }}>
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
                      style={{
                        height: 48,
                        backgroundColor: '#00CD6F',
                        width: '40%',
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        elevation: 20,
                      }}>
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
                  onPress={() => this.setState({overviewtab: true})}
                  style={{
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    width: '50%',
                    height: 30,
                    borderColor: '#00CD6F',
                    borderWidth: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
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
                  onPress={() => this.setState({overviewtab: false})}
                  style={{
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    width: '50%',
                    height: 30,
                    borderColor: '#00CD6F',
                    borderWidth: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      overviewtab != true ? '#00CD6F' : 'transparent',
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: overviewtab == true ? '#00CD6F' : 'white',
                    }}>
                    Social Media
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
                          Linking.openURL(`${details.homepage}`);
                        }}
                        style={{color: '#00CD6F', fontSize: 15}}>
                        view all
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                      }}>
                      {cast.cast &&
                        cast.cast
                          .map((item, index) => {
                            return (
                              <View key={index}>
                                <Image
                                  style={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 60 / 2,
                                  }}
                                  source={{
                                    uri: `${imglink}${item.profile_path}`,
                                  }}></Image>
                                <Text style={{color: 'grey'}}>
                                  {item.name.slice(0, 8)}..
                                </Text>
                              </View>
                            );
                          })
                          .slice(0, 4)}
                    </View>
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
                                this._fetchsocialmedia(item.id);
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
                <View
                  style={{
                    marginHorizontal: 18,
                    marginBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  {socialmedia.facebook_id && (
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(
                          `https://www.facebook.com/${socialmedia.facebook_id}`,
                        );
                      }}
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Entypo name="facebook" size={25} color="#0D8AF0" />
                      <Text>@{socialmedia.facebook_id.slice(0, 10)}..</Text>
                    </TouchableOpacity>
                  )}
                  {socialmedia.instagram_id && (
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(
                          `https://www.instagram.com/${socialmedia.instagram_id}`,
                        );
                      }}
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Entypo name="instagram" size={25} color="white" />
                      <Text>@{socialmedia.instagram_id.slice(0, 10)}..</Text>
                    </TouchableOpacity>
                  )}
                  {socialmedia.twitter_id && (
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(
                          `https://www.twitter.com/${socialmedia.twitter_id}`,
                        );
                      }}
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Entypo name="twitter" size={25} color="#1DA1F2" />
                      <Text>@{socialmedia.twitter_id.slice(0, 10)}..</Text>
                    </TouchableOpacity>
                  )}
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
export default connect(mapStateToProps, mapDispatchToProps)(Details);
