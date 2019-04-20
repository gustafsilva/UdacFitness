import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { purple } from '../utils/colors';

const DataHeader = ({ date }) => (
  <View>
    <Text style={{ color: purple, fontSize: 25 }}>{date}</Text>
  </View>
);

DataHeader.propTypes = {
  date: PropTypes.string.isRequired,
};

export default DataHeader;
