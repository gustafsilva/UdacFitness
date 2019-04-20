import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';


import store from './store';
import Tabs from './components/Tabs';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Tabs />
        </View>
      </Provider>
    );
  }
}
