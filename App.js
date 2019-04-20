import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import store from './store';
// import DataEntry from './components/DataEntry';
import History from './components/History';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <History />
        </View>
      </Provider>
    );
  }
}
