import React, { Component } from 'react';
import { Text, View, TextInput, AsyncStorage } from 'react-native';
import { Card, Button } from 'react-native-elements';
import axios from 'axios';
import BaseURL from '../config';
import Toast from 'react-native-root-toast';

class SendNotifications extends Component {


  state = { message: '' };

  onPress = async () => {
    const value = this.state.message;
    if (value === undefined || value.length <= 0) {
      alert('عندك مشكلة ياريس، تأكد انك كتبت شي');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer '+  token }
      });
      instance.post(BaseURL + '/users/send', {
        msg: this.state.message
      })
        .then((response) => {
          //console.log(response.data.users);
          if(response.status == 200){
            Toast.show('تم :) ', {
              duration: 500,
              position: Toast.positions.CENTER,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
          });  
            this.setState({ message: '' });
          }
 
        })
        .catch((error) => {
          console.log(error);
          alert('فيه مشكلة، حاول مرة ثانية');
          this.setState({ message: '' });
        });

  }
  render() {
    return (

      <View style={styles.pageStyle} >
        <Card title='وش تبي ترسلهم؟' >
          <TextInput
            style={styles.inputStyle}
            multiline
            numberOfLines={5}
            onChangeText={(text) => this.setState({ message: text })}
            value={this.state.message}
          />

          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 20 }}
            title='ارسل'
            rightIcon={{ name: 'send' }}
            onPress={() => this.onPress()}
          />

        </Card>
      </View>
    );


  }
}

const styles = {
  pageStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ECF2F4',
  },
  inputStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 0.5,
    borderColor: '#03A9F4',
    height: 100,
  }
};


export default SendNotifications;
