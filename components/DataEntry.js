import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import DateHeader from './DateHeader'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'

const SubmitBtn = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>SUBMIT</Text>
  </TouchableOpacity>
)

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

  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    })
    // update redux
    // navigate to home
    // save to db
    // clear local notification
  }

  render() {
    const metaInfo = getMetricMetaInfo()
    const keys = Object.keys(metaInfo)

    return (
      <View>
        <DateHeader date={(new Date()).toLocaleDateString()} />

        {keys.map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider'
                ? <UdaciSlider
                    value={value}
                    onChange={(value) => { this.slider(key, value) }}
                    {...rest}
                  />
                : <UdaciSteppers
                    value={value}
                    increment={() => { this.increment(key) }}
                    decrement={() => { this.decrement(key) }}
                  />
              }
            </View>
          )
        })}

        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

export default DataEntry
