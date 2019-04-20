import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import UdaciFitnessCalendar from 'udacifitness-calendar';

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

  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View>
      {today
        ? <Text>{JSON.stringify(today)}</Text>
        : <Text>{JSON.stringify(metrics)}</Text>
      }
    </View>
  )

  renderEmptyDate = (formattedDate) => (
    <View>
      <Text>No data for this day.</Text>
    </View>
  )

  render() {
    const { entries } = this.props;

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
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
