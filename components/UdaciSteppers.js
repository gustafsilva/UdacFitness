import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const UdaciStreppers = (props) => {
  const {
    // max,
    unit,
    value,
    onDecrement,
    onIncrement,
  } = props;
  return (
    <View>
      <TouchableOpacity onPress={onDecrement}>
        <FontAwesome name="minus" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onIncrement}>
        <Entypo name="plus" size={30} color="black" />
      </TouchableOpacity>
      <Text>{value}</Text>
      <Text>{unit}</Text>
    </View>
  );
};

UdaciStreppers.propTypes = {
  // max: PropTypes.number.isRequired,
  unit: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
};

export default UdaciStreppers;
