import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import { fetchCalendarResults } from '../utils/api';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { addEntry, receiveEntries } from '../store/actions';

class History extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    fetchCalendarResults()
      .then(entries => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          const addEntryAction = addEntry({ [timeToString()]: getDailyReminderValue() });

          dispatch(addEntryAction);
        }
      });
  }

  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
    );
  }
}

History.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = entries => ({
  entries,
});

export default connect(mapStateToProps)(History);
