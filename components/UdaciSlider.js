import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Slider,
} from 'react-native';

import { gray } from '../utils/colors';

const UdaciSlider = (props) => {
  const {
    max,
    unit,
    step,
    value,
    onChange,
  } = props;

  return (
    <View style={styles.row}>
      <Slider
        style={{ flex: 1 }}
        value={value}
        step={step}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />

      <View style={styles.metricCount}>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>{value}</Text>
        <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  metricCount: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

UdaciSlider.propTypes = {
  max: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UdaciSlider;
