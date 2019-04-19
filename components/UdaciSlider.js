import React from 'react';
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

export default UdaciSlider;
