import React from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';

const UdaciStatusBar = ({ backgroundColor, ...rest }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...rest} />
  </View>
);

UdaciStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};

export default UdaciStatusBar;
