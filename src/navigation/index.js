import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Watchlist from '../screens/Watchlist';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export class TabApp extends Component {
  render() {
    return (
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Now Playing"
          component={Home}
          options={{
            borderTopLeftRadius: 40,
            tabBarActiveTintColor: 'white',
            tabBarActiveBackgroundColor: '#122034',
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: '#122034',
            headerShown: false,
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="play" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Watchlist"
          component={Watchlist}
          options={{
            borderTopRightRadius: 40,
            tabBarActiveTintColor: 'white',
            tabBarActiveBackgroundColor: '#122034',
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: '#122034',
            headerShown: false,
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="view-list"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TabApp">
          <Stack.Screen
            name="TabApp"
            component={TabApp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Watchlist"
            component={Watchlist}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
