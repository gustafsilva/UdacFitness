import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { getMetricMetaInfo } from '../utils/helpers';


class DataEntry extends Component {

  render() {
    return (
      <View>
        {getMetricMetaInfo('sleep').getIcon()}
      </View>
    )
  }
}

export default DataEntry
