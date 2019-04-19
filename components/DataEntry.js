import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DateHeader from './DateHeader';
import UdaciSlider from './UdaciSlider';
import UdaciSteppers from './UdaciSteppers';
import TextButton from './TextButton';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import { submitEntry, removeEntry } from '../utils/api';

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
    const key = timeToString();
    const entry = this.state;

    // update redux
    // navigate to home
    // save to db
    submitEntry({ key, entry });
    // clear local notification
  }

  reset = () => {
    const key = timeToString();

    // update redux
    // route to home
    // update db
    removeEntry(key);
  }

  render() {
    const { state } = this;
    const { alreadyLogged } = this.props;
    const metaInfo = getMetricMetaInfo();
    const keys = Object.keys(metaInfo);

    if (alreadyLogged) {
      return (
        <View>
          <Ionicons
            name="md-happy"
            size={100}
          />
          <Text>You already logged your information for today.</Text>
          <TextButton onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      );
    }

    return (
      <ScrollView>
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
      </ScrollView>
    );
  }
}

DataEntry.defaultProps = {
  alreadyLogged: false,
};

DataEntry.propTypes = {
  alreadyLogged: PropTypes.bool,
};

export default DataEntry;
