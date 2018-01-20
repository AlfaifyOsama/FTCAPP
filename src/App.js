import React from 'react';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import MainStack from './components/RootTabs';
import BaseURL from './config';


export default class App extends React.Component {
  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onRegistered(notifData) {
    console.log('Device had been registered for push notifications!', notifData);
  }


  async onIds(device) {
    const deviceID = await AsyncStorage.getItem('device_id');
    console.log('Device info: ', deviceID);
    if (deviceID != undefined && deviceID != '' && deviceID !=null)
      return;
    console.log('Device info: ', device);
    const token = await AsyncStorage.getItem('token');
    console.log('token: ', token);
    if (token == undefined || token == '')
      return;
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer ' + token }
    });
    instance.put(BaseURL + '/users/deviceID', {
      device_id: device.userId
    })
      .then((response) => {
        if (response.status == 200){
          console.log('finished sending the request');
          AsyncStorage.setItem('device_id', device.userId);
          OneSignal.sendTag('device_id', 'true');
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  render() {
    return (
      // Root tabs is the navigator..
      <MainStack />
    );
  }
}
