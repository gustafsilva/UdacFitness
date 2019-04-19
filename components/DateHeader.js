import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const DataHeader = ({ date }) => (
  <View>
    <Text>{date}</Text>
  </View>
);

DataHeader.propTypes = {
  date: PropTypes.string.isRequired,
};

export default DataHeader;
