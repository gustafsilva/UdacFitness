import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';


import store from './store';
import UdaciStatusBar from './components/UdaciStatusBar';
import MainTabs from './navigations/MainTabs';
import { purple } from './utils/colors';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainTabs />
        </View>
      </Provider>
    );
  }
}
