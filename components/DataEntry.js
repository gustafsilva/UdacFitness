import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import DateHeader from './DateHeader';
import UdaciSlider from './UdaciSlider';
import UdaciSteppers from './UdaciSteppers';
import { getMetricMetaInfo } from '../utils/helpers';

const SubmitBtn = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>SUBMIT</Text>
  </TouchableOpacity>
);

class DataEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState((currentState) => {
      const count = currentState[metric] + step;
      return {
        ...currentState,
        [metric]: count >= max ? max : count,
      };
    });
  }

  decrement = (metric) => {
    const { step } = getMetricMetaInfo(metric);

    this.setState((currentState) => {
      const count = currentState[metric] - step;
      return {
        [metric]: count <= 0 ? 0 : count,
      };
    });
  }

  slider = (metric, value) => { this.setState({ [metric]: value }); }

  submit = () => {
    // const key = timeToString();
    // const entry = this.state;

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    });
    // update redux
    // navigate to home
    // save to db
    // clear local notification
  }

  render() {
    const { state } = this;
    const metaInfo = getMetricMetaInfo();
    const keys = Object.keys(metaInfo);

    return (
      <View>
        <DateHeader date={(new Date()).toLocaleDateString()} />

        {keys.map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = state[key];

          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider'
                ? (
                  <UdaciSlider
                    value={value}
                    onChange={(newValue) => { this.slider(key, newValue); }}
                    {...rest}
                  />
                )
                : (
                  <UdaciSteppers
                    value={value}
                    onIncrement={() => { this.increment(key); }}
                    onDecrement={() => { this.decrement(key); }}
                    {...rest}
                  />
                )
              }
            </View>
          );
        })}

        <SubmitBtn onPress={this.submit} />
      </View>
    );
  }
}

export default DataEntry;
