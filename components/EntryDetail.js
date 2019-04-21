import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return { title: `${month}/${day}/${year}` };
  }

  render() {
    const { navigation } = this.props;

    return <Text>{`Entry Detail - ${JSON.stringify(navigation.state.params.entryId)}`}</Text>;
  }
}

EntryDetail.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EntryDetail;
