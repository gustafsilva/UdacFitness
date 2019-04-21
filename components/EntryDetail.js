import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import MetricCard from './MetricCard';
import { white } from '../utils/colors';

class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return { title: `${month}/${day}/${year}` };
  }

  render() {
    const { metrics, entryId } = this.props;

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <Text>{`Entry Detail - ${JSON.stringify(entryId)}`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  }
});

EntryDetail.propTypes = {
  entryId: PropTypes.string.isRequired,
  metrics: PropTypes.objectOf(PropTypes.number).isRequired,
};

const mapStateToProps = (state, { navigation }) => {
  const { entryId } = navigation.state.params;

  return {
    entryId,
    metrics: state[entryId],
  };
};

export default connect(mapStateToProps)(EntryDetail);
