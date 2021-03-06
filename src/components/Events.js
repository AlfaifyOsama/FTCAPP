import React, { Component } from 'react';
import {
  Text, TouchableOpacity, ScrollView, View,
  AsyncStorage, RefreshControl, Keyboard
} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import BaseURL from '../config';
import { Spinner } from './common';


class Events extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight:
        <TouchableOpacity
          onPress={() => navigation.navigate('ManageEvents')}
          style={{ marginRight: 20 }}
        >
          <Ionicons
            name={'ios-settings'}
            size={26}
            style={{ color: '#000', paddingLeft: 50, }}
          />
        </TouchableOpacity>,

      headerLeft:
        <TouchableOpacity
          onPress={() => navigation.navigate('AddEvent', {
            onGoBack: () => params.goToRefresh(),
          })}
          style={{ marginLeft: 20, paddingRight: 50, }}
        >
          <Ionicons
            name={'md-add'}
            size={26}
            style={{ color: '#000' }}
          />
        </TouchableOpacity>
    };
  }

  state = {
    events: [],
    showAlertLoading: false,
    showAlertConfirm: false,
    refreshing: false,
    selectedProjectId: null,
    loading: true
  };

  componentDidMount() {
    this.props.navigation.setParams({ goToRefresh: this.refresh });
    this.getEvents();
  }

  onJoinEventClick = async () => {
    this.setState({ showAlertLoading: true, showAlertConfirm: false });
    const token = await AsyncStorage.getItem('token');
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer ' + token }
    });
    instance.post(BaseURL + '/events/join', { event_id: this.state.selectedProjectId })
    .then((response) => {
      this.setState({ showAlertLoading: false, loading: true });
      this.getEvents();
      // the last line will request the events again so
      // the events that was just registered to will be disabled,
      // go down to the bottom of the page!
    })
      .catch((error) => {
        this.setState({ showAlertLoading: false });
      });
  }

  getEvents = async () => {
    const token = await AsyncStorage.getItem('token');
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer ' + token }
    });
    instance.get(BaseURL + '/events/getReadyEvents')
      .then((response) => {
        this.setState({ events: response.data, loading: false });
        // console.log(response.data);
      })
      .catch((error) => {
        this.setState({ loading: false });
        // alert('فيه مشكلة');
      });
  }

  refresh = () => {
    this.setState({ loading: true });
    this.getEvents();
  }

  showAlert = (type) => {
    if (type === 'confirm') {
      this.setState({
        showAlertConfirm: true
      });
    }
    this.setState({
      showAlertLoading: true
    });
  }

  hideAlert = () => {
    this.setState({
      showAlertLoading: false,
      showAlertConfirm: false
    });
  }


  buttonIsDisabled(project) {
    if (project.full || project.isRegistered) {
      return true;
    }
    return false;
  }

  renderButtonTitle(project) {
    if (project.isRegistered) {
      return 'تم تسجيلك مسبقاً في المشروع';
    } else if (project.full) {
      return 'اكتمل عدد الأعضاء';
    } else if (project.type === 'ORGANIZE') {
      return 'شارك في التنظيم';
    } else if (project.type === 'ATTEND') {
      return 'احضر الفعالية';
    }
  }
  renderEmptyEventsText = () => {
    if (this.state.events.length === 0) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, marginTop: '50%' }} >مافيه فعاليات :( </Text>
        </View>

      );
    }
  }

  renderButtonIconName(project) {
    if (project.type === 'ORGANIZE') {
      return 'handshake-o';
    }
    return 'smile-o';
  }

  buttonColor(project) {
    let color;
    if (project.type === 'ATTEND') {
      color = '#9ccc65';
    } else {
      color = '#03A9F4';
    }
    return color;
  }

  renderAppropriateButton(project) {
    //console.log(project);
    const isDisabled = this.buttonIsDisabled(project);
    const title = this.renderButtonTitle(project);
    const iconName = this.renderButtonIconName(project);
    const buttonColor = this.buttonColor(project);
    return (
      <Button
        backgroundColor={buttonColor}
        buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title={title}
        rightIcon={{ name: iconName, type: 'font-awesome' }}
        onPress={() => this.setState({ showAlertConfirm: true, selectedProjectId: project.id })}
        disabled={isDisabled}
      />
    );
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getEvents();
    this.setState({ refreshing: false });
  }

  render() {
    Keyboard.dismiss();

    if (this.state.loading) {
      return (<Spinner />);
    }
    const { showAlertLoading, showAlertConfirm } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#ECF2F4' }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          {this.renderEmptyEventsText()}

          {
            this.state.events.map((item, i) => (
              <View
                style={[{ paddingBottom: i === this.state.events.length - 1 ? 20 : 0 }, styles.pageStyle]}
                key={i}
              >
                <Card title={item.name} key={i} containerStyle={{ borderRadius: 10 }}>
                  <Text style={{ marginBottom: 25, textAlign: 'center' }}>
                    {item.description}
                  </Text>
                  <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', marginBottom: 5, paddingTop: 5, paddingBottom: 5, borderRadius: 20, borderWidth: 1, borderColor: '#03A9F4', width: '80%' }}>
                    <Text style={{ alignSelf: 'center', marginRight: 5 }}>
                      قائد المشروع: {item.leader}
                    </Text>
                    <Icon
                      name='account-settings-variant'
                      type='material-community'
                      size={20}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', marginBottom: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 20, borderWidth: 1, borderColor: '#03A9F4', width: '80%' }}>
                    <Text style={{ alignSelf: 'center', marginRight: 5 }}>
                      تاريخ المشروع: {item.date}
                    </Text>
                    <Icon
                      name='calendar'
                      type='entypo'
                      size={20}
                    />
                  </View>
                  {this.renderAppropriateButton(item)}
                </Card>
              </View>
            ))
          }
        </ScrollView>
        <AwesomeAlert
          show={showAlertLoading}
          showProgress
          title="لحظات"
          message="جاري تنفيذ طلبك.."
          closeOnTouchOutside
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={false}
        />
        <AwesomeAlert
          show={showAlertConfirm}
          showProgress={false}
          title="اكيد تبي تشارك؟"
          message="تأكد ان محمد الشهري بإنتظارك اذا سحبت!"
          closeOnTouchOutside
          closeOnHardwareBackPress={false}
          showCancelButton
          showConfirmButton
          cancelText="لا هونت"
          confirmText="ايه اكيد"
          confirmButtonColor="#9ccc65"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
            this.onJoinEventClick();
          }}
        />
      </View>
    );
  }

}

const styles = {
  pageStyle: {
    flex: 1,
    flexDirection: 'column',
  },
};

export default Events;
