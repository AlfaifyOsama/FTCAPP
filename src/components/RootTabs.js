import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { View } from 'react-native';
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
import AddPoints from './AddPoints';
import MyProfile from './MyProfile';
import EventsHistory from './EventsHistory';

const PointsStack = StackNavigator({
  Points: {
    screen: Points,
    navigationOptions: {
      title: 'النقاط',
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
    }
  }
});
const EventsStack = StackNavigator({
  Events: {
    screen: Events,
    navigationOptions: {
      title: 'الفعاليات',
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
    },
  },
  AddEvent: {
    screen: AddEvent,
    navigationOptions: {
      title: 'اضف مشروعك يا وحش',
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
      headerRight: (<View />) // To center the text, you have to put something fake in the header to shift the text on the right.
    }
  },
  ManageEvents: {
    screen: ManageEvents,
    navigationOptions: {
      title: 'ادارة مشاريعك',
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
      headerRight: (<View />) // To center the text, you have to put something fake in the header to shift the text on the right.
    }
  },
  ManageEventsSingle: {
    screen: ManageEventsSingle,
    navigationOptions: {
      title: 'عدل مشروعك القوي',
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
      headerRight: (<View />) // To center the text, you have to put something fake in the header to shift the text on the right.
    }
  },
  SubmitWork: {
    screen: SubmitWork,
    navigationOptions: {
      title: 'رصد أعمال الأعضاء',
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
      headerRight: (<View />) // To center the text, you have to put something fake in the header to shift the text on the right.
    }
  },

});

const MoreStack = StackNavigator({

  More: {
    screen: More,
    navigationOptions: {
      title: 'اشياء اتوقع ما تهمك',
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
    }
  },
  ApprovePoints: {
    screen: ApprovePoints,
    navigationOptions: {
      title: 'ارصد النقاط يالذيب',
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
      headerRight: (<View />) // To center the text, you have to put something fake in the header to shift the text on the right.
    }
  },
  ApprovePointsSingle: {
    screen: ApprovePointsSingle,
    navigationOptions: {
      title: 'ارصد النقاط يالذيب',
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
      headerRight: (<View />) // To center the text, you have to put something fake in the header to shift the text on the right.
    }
  },
  SendNotifications: {
    screen: SendNotifications,
    navigationOptions: {
      title: 'ارسل التنبيهات هنا يالذيب',
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
      headerRight: (<View />) // To center the text, you have to put something fake in the header to shift the text on the right.
    }
  },
  UsersList: {
    screen: UsersList,
    navigationOptions: {
      title: 'الأعضاء',
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
      headerRight: (<View />) // To center the text, you have to put something fake in the header to shift the text on the right.
    }
  },
  MyProfile: {
    screen: MyProfile,
    navigationOptions: {
      title: 'حسابي الزبال',
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
      headerRight: (<View />) // To center the text, you have to put something fake in the header to shift the text on the right.
    }
  },
  AddPoints: {
    screen: AddPoints,
    navigationOptions: {
      title: 'ارصد ياعم',
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
      headerRight: (<View />) // To center the text, you have to put something fake in the header to shift the text on the right.
    }
  },
  EventsHistory: {
    screen: EventsHistory,
    navigationOptions: {
      title: 'تاريخ فعالياتي',
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
      headerRight: (<View />) // To center the text, you have to put something fake in the header to shift the text on the right.
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
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
      headerRight: (<View />) // To center the text, you have to put something fake in the header to shift the text on the right.
    }
  },
  Home: {
    screen: ({ navigation }) => <RootTabs screenProps={{ rootNavigation: navigation }} />,
    navigationOptions: {
      header: null,
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      },
      headerRight: (<View />) // To center the text, you have to put something fake in the header to shift the text on the right.
    }
  }
});

export default MainStack;
