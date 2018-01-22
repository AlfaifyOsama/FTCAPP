import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Home from './Home';
import Points from './Points';
import Events from './Events';
import More from './More';
import LoginForm from './LoginForm';
import ApprovePoints from './ApprovePoints';
import SendNotifications from './SendNotifications';
import ApprovePointsSingle from './ApprovePointsSingle';
import ManageEvents from './ManageEvents';
import ManageEventsSingle from './ManageEventsSingle';
import AddEvent from './AddEvent';
import SubmitWork from './SubmitWork';
import UsersList from './UsersList';

import MyProfile from './MyProfile';
import EventsHistory from './EventsHistory';

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
  },
  AddEvent: {
    screen: AddEvent,
    navigationOptions: {
      title: 'اضف مشروعك يا وحش',
    }
  },
  ManageEvents: {
    screen: ManageEvents,
    navigationOptions: {
      title: 'ادارة مشاريعك',
    }
  },
  ManageEventsSingle: {
    screen: ManageEventsSingle,
    navigationOptions: {
      title: 'عدل مشروعك القوي',
    }
  },
  SubmitWork: {
    screen: SubmitWork,
    navigationOptions: {
      title: 'رصد أعمال الأعضاء',
    }
  },

});

const MoreStack = StackNavigator({

  More: {
    screen: More,
    navigationOptions: {
      title: 'اشياء اتوقع ما تهمك',
    }
  },
  ApprovePoints: {
    screen: ApprovePoints,
    navigationOptions: {
      title: 'ارصد النقاط يالذيب',
    }
  },
  ApprovePointsSingle: {
    screen: ApprovePointsSingle,
    navigationOptions: {
      title: 'ارصد النقاط يالذيب',
    }
  },
  SendNotifications: {
    screen: SendNotifications,
    navigationOptions: {
      title: 'ارسل التنبيهات هنا يالذيب',
    }
  },
  UsersList: {
    screen: UsersList,
    navigationOptions: {
      title: 'الأعضاء',
    }
  },
  MyProfile: {
    screen: MyProfile,
    navigationOptions: {
      title: 'حسابي الزبال',
    }
  },
  EventsHistory: {
    screen: EventsHistory,
    navigationOptions: {
      title: 'تاريخ فعالياتي'
    },
  }

});

const RootTabs = TabNavigator({
  Home: {
    screen: Home,
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


const MainStack = StackNavigator({
  Login: {
    screen: LoginForm,
    navigationOptions: {
      title: 'البيت',
      header: null,
    }
  },
  Home: {
    screen: ({ navigation }) => <RootTabs screenProps={{ rootNavigation: navigation }} />, 
    navigationOptions: {
      header: null,
    }
  }
});

export default MainStack;
