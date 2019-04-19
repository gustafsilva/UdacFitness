import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { getMetricMetaInfo } from '../utils/helpers';


class DataEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState((currentState) => {
      const count = currentState[metric] + step;

      return {
        ...state,
        [metric]: count > max ? max : count,
      }
    })
  }

  decrement = (metric) => {
    const { step } = getMetricMetaInfo(metric);

    this.setState(() => {
      const count = state[metric] - step;
      return {
        [metric]: count <= 0 ? 0 : count,
      }
    })
  }

  slider = (metric, value) => { this.setState({ [metric]: value }) }


  render() {
    return (
      <View>
        {getMetricMetaInfo('sleep').getIcon()}
      </View>
    )
  }
}

export default DataEntry
