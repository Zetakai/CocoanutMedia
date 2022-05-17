/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {Provider} from 'react-redux';
import Router from './src/navigation'
import {PersistGate} from 'redux-persist/integration/react';
import {Persistor, Store} from './src/redux/store';
const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <Router/>
      </PersistGate>
    </Provider>
  );
};
export default App;
