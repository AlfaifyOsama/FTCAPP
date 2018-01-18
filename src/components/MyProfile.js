import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import BaseURL from '../config';

class MyProfile extends Component {


  state = { pass1: '', pass2: '', showLoadingAlert: false, showErrorAlert: false };

  onPress = async () => {
    const value1 = this.state.pass1;
    const value2 = this.state.pass2;
    if (value1 !== value2 || value1.lenght < 6 || value1 == undefined || value1 == '' ) {
        this.showErrorAlert();
      return;
    }
    this.showLoadingAlert();

    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('userID');
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer '+  token }
      });
      instance.put(BaseURL + '/users/update', {
        password: value1
      })
        .then((response) => {
          //console.log(response.data.users);
          if(response.status === 200){
            this.hideLoadingAlert();
            this.props.navigation.goBack(null);
          }
        })
        .catch((error) => {
          console.log(error);
          this.showErrorAlert();
          this.setState({ pass1: '', pass2: '' });
        });

  }

  showLoadingAlert = () => {
    this.setState({
        showLoadingAlert: true
    });
  }

  hideLoadingAlert = () => {
    this.setState({
      showLoadingAlert: false
    });
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


  onCancelPressed = () => {
    this.hideErrorAlert();
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
        <AwesomeAlert
      show={this.state.showLoadingAlert}
      showProgress={true}
      title="Loading"
      message="لحظات ..."
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={false}
      showConfirmButton={false}
    />
    <AwesomeAlert
      show={this.state.showErrorAlert}
      title="بروبلم"
      message="عندك مشلكلة، تأكد ان الخانتين نفس الشي ،وان كلمة السر تتجاوز 6 حروف وارقام"
      closeOnHardwareBackPress={false}
      showCancelButton={true}
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
    backgroundColor: '#ECF2F4',
  },
  inputStyle: {
    shadowRadius: 2,
    borderColor: '#03A9F4',
    alignItems: 'flex-end'
  }
};


export default MyProfile;
