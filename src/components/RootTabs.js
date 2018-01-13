import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Home from './Home';
import Points from './Points';
import Events from './Events';
import More from './More';
import LoginForm from './LoginForm';

const HomeStack = StackNavigator({
  Login: {
    screen: LoginForm,
    navigationOptions: {
      title: 'البيت',
      tabBarVisible: false,
      header: null,
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'البيت',
      header: null
    }
  }
}, {
      headerMode: 'screen',
      cardStyle: { backgroundColor: '#fff'
    }
});

const PointsStack = StackNavigator({
  Points: {
    screen: Points,
    navigationOptions: {
      title: 'النقاط',
    }
  }
});

const EventsStack = StackNavigator({
  Events: {
    screen: Events,
    navigationOptions: {
      title: 'الفعاليات',
    }
  }
});

const MoreStack = StackNavigator({
  More: {
    screen: More,
    navigationOptions: {
      title: 'اشياء اتوقع ما تهمك',
    }
  }
});

const RootTabs = TabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'البيت',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Points: {
    screen: PointsStack,
    navigationOptions: {
      tabBarLabel: 'النقاط',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-trophy' : 'ios-trophy-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Events: {
    screen: EventsStack,
    navigationOptions: {
      tabBarLabel: 'الفعاليات',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-beer' : 'ios-beer-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
    More: {
      screen: MoreStack,
      navigationOptions: {
        tabBarLabel: 'مالها مكان',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-keypad' : 'ios-keypad-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
  },
});

export default RootTabs;
