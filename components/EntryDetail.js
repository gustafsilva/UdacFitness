import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const EntryDetail = ({ navigation }) => <Text>{`Entry Detail - ${JSON.stringify(navigation.state.params.entryId)}`}</Text>;

EntryDetail.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EntryDetail;
