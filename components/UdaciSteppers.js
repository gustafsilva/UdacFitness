import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

import { purple, gray, white } from '../utils/colors';

class UdaciStreppers extends Component {
  renderIosBtn = () => {
    const { onDecrement, onIncrement } = this.props;

    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={[
            styles.iosBtn,
            { borderTopRightRadius: 0, borderBottomRightradius: 0 }
          ]}
          onPress={onDecrement}
        >
          <Entypo name="minus" size={30} color={purple} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iosBtn,
            { borderTopLeftRadius: 0, borderBottomLeftradius: 0, borderLeftWidth: 0 }
          ]}
          onPress={onIncrement}
        >
          <Entypo name="plus" size={30} color={purple} />
        </TouchableOpacity>
      </View>
    );
  }

  renderAndroidBtn = () => {
    const { onDecrement, onIncrement } = this.props;

    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.androidBtn}
          onPress={onDecrement}
        >
          <FontAwesome name="minus" size={30} color={white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.androidBtn}
          onPress={onIncrement}
        >
          <FontAwesome name="plus" size={30} color={white} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {
      // max,
      unit,
      value,
    } = this.props;

    return (
      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        {Platform.OS === 'ios' ? this.renderIosBtn() : this.renderAndroidBtn()}

        <View style={styles.metricCount}>
          <Text style={{ fontSize: 24, textAlign: 'center' }}>{value}</Text>
          <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  metricCount: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  androidBtn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
  },
});

UdaciStreppers.propTypes = {
  // max: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
};

export default UdaciStreppers;
