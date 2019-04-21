import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainTabs from './MainTabs';
import EntryDetail from '../components/EntryDetail';
import { white, purple } from '../utils/colors';

const MainNavigator = createStackNavigator({
  Home: {
    screen: MainTabs,
    navigationOptions: {
      header: null,
    },
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: () => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }),
  }
});

export default createAppContainer(MainNavigator);
