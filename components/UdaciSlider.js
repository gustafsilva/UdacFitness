import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Slider } from 'react-native';

const UdaciSlider = (props) => {
  const {
    max,
    unit,
    step,
    value,
    onChange,
  } = props;

  return (
    <View>
      <Slider
        value={value}
        step={step}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <Text>{value}</Text>
      <Text>{unit}</Text>
    </View>
  );
};

UdaciSlider.propTypes = {
  max: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default UdaciSlider;
