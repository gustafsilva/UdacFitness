import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';


import store from './store';
import UdaciStatusBar from './components/UdaciStatusBar';
import MainNavigator from './navigations/MainNavigator';
import { purple } from './utils/colors';
import { setLocalNotification } from './utils/helpers';

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
