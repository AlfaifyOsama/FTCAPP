import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';


export default class More extends Component {
  state = { options: [], showLoadingAlert: false };


  componentDidMount() {
    this.setState({
      options: [
        {
          title: 'رصد النقاط',
          icon: 'work'
        },
        {
          title: 'ارسال التنبيهات',
          icon: 'send',
        },
        {
          title: 'حسابي',
          icon: 'account-circle',
        },
        {
          title: 'سجل فعالياتي',
          icon: 'history',
        },
        {
          title: 'رصد أعمالي',
          icon: 'note-add',
        },
        {
          title: 'تسجيل الخروج',
          icon: 'cancel',
        },
      ]
    });
  }


  onPress = async (x) => {
    const isAdmin = await AsyncStorage.getItem('isAdmin');

    switch(x) {
      case 0:
        isAdmin === '1' ? this.props.navigation.navigate('ApprovePoints') : this.showErrorAlert();  
        break;
      case 1:
        isAdmin === '1' ? this.props.navigation.navigate('SendNotifications') : this.showErrorAlert();
        break;
      case 2:
        this.props.navigation.navigate('MyProfile');
        break;
      case 3:
        this.props.navigation.navigate('EventsHistory');
        break;
      case 4:
        this.props.navigation.navigate('RecordMyWork');
       break;
      case 5:
        this.showSignOutAlert();
        break;
      default:
          return;
  }

  }

  showErrorAlert = () => {
    this.setState({
      showErrorAlert: true,
      showSignOutAlert: false
    });
  }
  hideErrorAlert = () => {
    this.setState({
      showErrorAlert: false
    });
  }

  showSignOutAlert = () => {
    this.setState({
      showSignOutAlert: true,
      showErrorAlert: false
    });
  }

  hideSignOutAlert = () => {
    this.setState({
      showSignOutAlert: false,
    });
  }

  signOut = () => {
    AsyncStorage.clear();
    this.props.screenProps.rootNavigation.navigate('Login');
  }


  render() {
    const { pageStyle, listStyle } = styles;
    return (
      // <ScrollView style={{ backgroundColor: '#ECF2F4'}} >
      <View style={pageStyle}>
        <List style={listStyle}
          containerStyle={{ marginBottom: 20, marginTop: 0 }}
        >
          {
            this.state.options.map((item, i) => (
              <ListItem
                onPress={() => this.onPress(i)}
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon }}
              />
            ))
          }
        </List>
        <AwesomeAlert
          show={this.state.showErrorAlert}
          title="بروبلم"
          message='معليش هذي للادمن بس، تحسب الدنيا فوضى؟'
          closeOnHardwareBackPress={false}
          showCancelButton
          cancelText={'طيب'}
          cancelButtonColor={'red'}
          onCancelPressed={() => this.hideErrorAlert()}
        />
        <AwesomeAlert
          show={this.state.showSignOutAlert}
          title="على وين يانور العين؟"
          message='متأكد ودك تروح وتتركنا؟'
          closeOnHardwareBackPress={false}
          showCancelButton
          showConfirmButton
          cancelText='ما أقدر أتركم :)'
          onCancelPressed={() => this.hideSignOutAlert()}
          confirmText='انا زبال سحبة'
          confirmButtonColor={'red'}
          onConfirmPressed={() => this.signOut()}
        />

      </View>
    );
  }
}

const styles = {
  pageStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ECF2F4'
  },
  listStyle: {
    justifyContent: 'space-between',
    height: 100,
  }

};
