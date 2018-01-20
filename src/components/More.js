import React, { Component } from 'react';
import { View, AsyncStorage, ScrollView } from 'react-native';
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
          title: 'الأعضاء',
          icon: 'work'
        },
        {
          title: 'حسابي',
          icon: 'account-circle',
        },
      ]
    });
  }


  onPress = async (x) => {
    const isAdmin = await AsyncStorage.getItem('isAdmin');
    if (x == 0) {
      isAdmin == '1' ? this.props.navigation.navigate('ApprovePoints') : this.showErrorAlert();
    }
    else if (x == 1) {
      isAdmin == '1' ? this.props.navigation.navigate('SendNotifications') : this.showErrorAlert();
    }
    else if (x == 2){
      this.props.navigation.navigate('UsersList');
    }
    else if (x == 3){
      this.props.navigation.navigate('MyProfile');
    }
  }

  showErrorAlert = () => {
    this.setState({
      showErrorAlert: true
    });
  }
  hideErrorAlert = () => {
    this.setState({
      showErrorAlert: false
    });
  }

  render() {
    const { pageStyle, listStyle, listItem } = styles;
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
                style={listItem}
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
