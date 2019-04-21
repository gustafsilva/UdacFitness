import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import MetricCard from './MetricCard';
import TextButton from './TextButton';
import { white } from '../utils/colors';
import { addEntry } from '../store/actions';
import { removeEntry } from '../utils/api';
import { timeToString, getDailyReminderValue } from '../utils/helpers';

class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return { title: `${month}/${day}/${year}` };
  }

  shouldComponentUpdate = (nextProps) => nextProps.metrics !== null && !nextProps.metrics.today;

  reset = () => {
    const { remove, goBack, entryId } = this.props;

    remove();
    goBack();
    removeEntry(entryId);
  }

  render() {
    const { metrics } = this.props;

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <TextButton
          style={{ margin: 20 }}
          onPress={this.reset}
        >
          RESET
        </TextButton>
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
  metrics: PropTypes.objectOf(PropTypes.any).isRequired,
  remove: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { navigation }) => {
  const { entryId } = navigation.state.params;

  return {
    entryId,
    metrics: state[entryId],
  };
};

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { entryId } = navigation.state.params;

  return {
    remove: () => (
      dispatch(addEntry({
        [entryId]: timeToString() === entryId
          ? getDailyReminderValue()
          : null
      }))
    ),
    goBack: () => navigation.goBack(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
