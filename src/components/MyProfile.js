import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import axios from 'axios';
import BaseURL from '../config';

class MyProfile extends Component {


  state = { pass1: '', pass2: '' };

  onPress = async () => {
    const value1 = this.state.pass1;
    const value2 = this.state.pass2;
    if (value1 !== value2) {
      alert('عندك مشكلة ياريس، تأكد انك كتبت شي');
      return;
    }
    if(value.lenght < 6) {
        alert('عندك خطأ، لازم يحتوي الرقم السري على  30 حرف.');


        return; 
    }
    return;
    // const token = await AsyncStorage.getItem('token');
    // const instance = axios.create({
    //   timeout: 5000,
    //   headers: { 'Authorization': 'Bearer '+  token }
    //   });
    //   instance.post(BaseURL + '/users/send', {
    //     msg: this.state.message
    //   })
    //     .then((response) => {
    //       //console.log(response.data.users);
    //       if(response.status == 200){
    //         this.refs.toast.show('تم :)',500);
    //         this.setState({ message: '' });
    //       }
 
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       alert('فيه مشكلة، حاول مرة ثانية');
    //       this.setState({ message: '' });
    //     });

  }
  render() {
    return (
      <View style={styles.pageStyle} >
        <Card title='تغيير كلمة السر' >
            <FormLabel containerStyle={styles.inputStyle} >الرقم السري الجديد</FormLabel>
            <FormInput secureTextEntry onChangeText={(text) => this.setState({ pass1: text })}/>
            <FormLabel containerStyle={styles.inputStyle} >تأكيد الرقم السري الجديد</FormLabel>
            <FormInput secureTextEntry onChangeText={(text) => this.setState({ pass2: text })}/>
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 20 }}
            title='اعتمد'
            rightIcon={{ name: 'check-circle' }}
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
    shadowRadius: 2,
    borderColor: '#03A9F4',
    alignItems: 'flex-end'
  }
};


export default MyProfile;
