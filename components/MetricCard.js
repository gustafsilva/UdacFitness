import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import DateHeader from './DateHeader';
import { getMetricMetaInfo } from '../utils/helpers';
import { gray } from '../utils/colors';

const MetricCard = ({ date, metrics }) => (
  <View>
    {date !== '' && <DateHeader date={date} />}
    {Object.keys(metrics).map((metric) => {
      const {
        getIcon,
        displayName,
        unit,
      } = getMetricMetaInfo(metric);

      return (
        <View style={styles.metric} key={metric}>
          {getIcon()}
          <View>
            <Text style={{ fontSize: 20 }}>{displayName}</Text>
            <Text style={{ fontSize: 16, color: gray }}>
              {`${metrics[metric]} ${unit}`}
            </Text>
          </View>
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  metric: {
    flexDirection: 'row',
    marginTop: 12,
  }
});

MetricCard.defaultProps = {
  date: '',
};

MetricCard.propTypes = {
  date: PropTypes.string,
  metrics: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default MetricCard;
