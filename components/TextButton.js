import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { purple } from '../utils/colors';

const TextButton = ({ children, onPress, style }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={[styles.reset, style]}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: purple,
  }
});

TextButton.defaultProps = {
  style: {},
};

TextButton.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.any),
};

export default TextButton;
