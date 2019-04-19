import React from 'react';
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

export default UdaciStreppers;
