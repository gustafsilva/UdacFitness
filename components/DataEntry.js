import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import DateHeader from './DateHeader';
import UdaciSlider from './UdaciSlider';
import UdaciSteppers from './UdaciSteppers';
import TextButton from './TextButton';
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
  getPlatformOS,
} from '../utils/helpers';
import { submitEntry, removeEntry } from '../utils/api';
import { addEntry } from '../store/actions';
import { white, purple } from '../utils/colors';

const SubmitBtn = ({ onPress }) => (
  <TouchableOpacity
    style={getPlatformOS() === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
    onPress={onPress}
  >
    <Text style={styles.submitBtnText}>SUBMIT</Text>
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
    const { dispatch } = this.props;

    // update redux
    dispatch(addEntry({
      [key]: entry,
    }));
    // navigate to home
    this.toHome();
    // save to db
    submitEntry({ key, entry });
    // clear local notification
  }

  reset = () => {
    const { dispatch } = this.props;
    const key = timeToString();

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    });
    // update redux
    dispatch(addEntry({
      [key]: getDailyReminderValue(),
    }));
    // route to home
    this.toHome();
    // update db
    removeEntry(key);
  }

  toHome = () => {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back({ key: 'DataEntry' }));
  }

  render() {
    const { state } = this;
    const { alreadyLogged } = this.props;
    const metaInfo = getMetricMetaInfo();
    const keys = Object.keys(metaInfo);

    if (alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
            name="md-happy"
            size={100}
          />
          <Text>You already logged your information for today.</Text>
          <TextButton onPress={this.reset} style={{ padding: 30 }}>
            Reset
          </TextButton>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <DateHeader date={(new Date()).toLocaleDateString()} />

        {keys.map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = state[key];

          return (
            <View key={key} style={styles.row}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
});

DataEntry.defaultProps = {
  alreadyLogged: false,
};

DataEntry.propTypes = {
  alreadyLogged: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined',
  };
};

export default connect(mapStateToProps)(DataEntry);
