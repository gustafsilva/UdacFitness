import React from 'react';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import History from '../components/History';
import DataEntry from '../components/DataEntry';
import { getPlatformOS } from '../utils/helpers';
import { purple, white } from '../utils/colors';

const RouteConfigs = {
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
    }
  },
  DataEntry: {
    screen: DataEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor} />
    }
  },
};

const TabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: getPlatformOS() === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: getPlatformOS() === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
};

const Tabs = getPlatformOS() === 'ios'
  ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
  : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

export default createAppContainer(Tabs);
