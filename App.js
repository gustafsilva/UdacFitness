import React, { Component } from 'react';
import { View } from 'react-native';

import DataEntry from './components/DataEntry';

export default class App extends Component {
  render() {
    return (
      <View>
        <DataEntry />
      </View>
    );
  }
}
