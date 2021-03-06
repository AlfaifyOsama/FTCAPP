import axios from 'axios';
import React, { Component } from 'react';
import { View, Image, AsyncStorage, ImageBackground, StatusBar,
   Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { TextField } from 'react-native-material-textfield';
import { NavigationActions } from 'react-navigation';
import { Button, Spinner } from './common';
import { ifIphoneX } from "react-native-iphone-x-helper";
import BaseURL from '../config';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      alert: '',
      loading: true,
      showAlert: false,
      alertMsg: ''
    };
  }

  componentDidMount() { // ran before render
    this.loadInitialState();
  }

  onButtonPress() {
    this.setState({ loading: true });
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' })
      ]
    });
    axios.post(BaseURL + '/users/login', {
      student_id: this.state.id,
      password: this.state.password
    })
      .then((response) => {
        //console.log(response);
       // console.log("Yosif zbal");


        const token = response.data[0]['token'];
        const userID = response.data["user"]["id"] +'';
        const firstName = response.data["user"]["first_name"];
        const lastName = response.data["user"]["last_name"];
        const studentID = response.data["user"]["student_id"] +'';
        const isAdmin = response.data["user"]["is_admin"]+'';


        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('userID', userID);
        AsyncStorage.setItem('firstName', firstName);
        AsyncStorage.setItem('lastName', lastName);
        AsyncStorage.setItem('studentID', studentID);
        AsyncStorage.setItem('isAdmin', isAdmin);

        this.setState({ loading: false });
        this.renderButtonOrSpinner();
       // this.props.navigation.dispatch(resetAction); // AYYY
       this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        //console.log(error);
        if (error.response) {
          this.setState({ alertMsg: 'معلوماتك غلط يا كبتن', showAlert: true, loading: false });
        } else {
          this.setState({ alertMsg: 'فيه مشكلة بالاتصال، نواف القعيد هو السبب', showAlert: true, loading: false });
        }
        this.renderButtonOrSpinner();
      });
  }

  loadInitialState = async () => {
   const value = await AsyncStorage.getItem('token');
   const resetAction = NavigationActions.reset({
     index: 0,
     actions: [
       NavigationActions.navigate({ routeName: 'Home' })
     ]
   });

   // value !== null && value !==''
    if (value !== null && value !=='') { // user has loggen in
      this.props.navigation.dispatch(resetAction);
    } else {
      this.setState({ loading: false });
    }
  }

  hideAlert = () => {
    this.setState({
      showAlert: false
        });
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
      return <Spinner size={'small'} />;
    }
    return <Button text={'دخول'} onPress={this.onButtonPress.bind(this)} />;
  }

  renderSpinner() {
    return <Spinner />;
  }

  render() {

    const { iconStyle, container, logo, pageStyle,
            inputline, sectionStyle, button, statusBarBackground
          } = styles;

    if (this.state.loading) {
      return this.renderSpinner();
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={pageStyle}>
        <ImageBackground
          style={{ height: '100%', width: '100%' }}
          source={require('./images/blurBg.png')}
        >
        <View style={container}>
        <StatusBar backgroundColor="#1976D2" />
          <Image
            style={logo}
            source={require('./images/ftcLogoWhite.png')}
          />
          <View style={{ top: -60 }}>
            <TextField
              label='الرقم الجامعي'
              value={this.state.id}
              onChangeText={id => this.setState({ id })}
              inputContainerStyle={{ alignItems: 'flex-end' }}
              style={{ textAlign: 'right' }}
              autoCapitalize={'none'}
              autoCorrect={false}
              baseColor={'#dbdbdb'}
              tintColor={'#fff'}
              textColor={'#fff'}
            />

            <TextField
              label='كلمة المرور'
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              inputContainerStyle={{ alignItems: 'flex-end' }}
              style={{ textAlign: 'right' }}
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry
              baseColor={'#dbdbdb'}
              tintColor={'#fff'}
              textColor={'#fff'}
            />
          <View style={button}>
            {this.renderButtonOrSpinner()}
          </View>
        </View>

        </View>
        </ImageBackground>
        <AwesomeAlert
      show={this.state.showAlert}
      title="بروبلم"
      message={this.state.alertMsg}
      closeOnTouchOutside
      closeOnHardwareBackPress
      showConfirmButton
      confirmButtonColor="red"
      confirmText="طيب"
      onConfirmPressed={() => {
        this.hideAlert();
      }}
    />
      </View>
      </TouchableWithoutFeedback>

    );
  }
}

const styles = {
  container: {
    flexDirection: 'column',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 0,
  },
  button: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'flex-start',
  },
  logo: {
    alignSelf: 'center',
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
    opacity: 0.7
  },
  pageStyle: {
    flex: 1,
    ...Platform.select({
      ios: {
        ...ifIphoneX(
          {
            marginTop: 0
          },
          {
            marginTop: 21
          }
        )
      },
      android: {
        marginTop: 0
      }
    })
  },
  sectionStyle: {
    flexDirection: 'row',
  },
  iconStyle: {
    opacity: 0.5,
    marginLeft: 10
  },
  statusBarBackground: {
    width: '100%',
    height: 21,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    opacity: 0.3
  }
};
