import axios from 'axios';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { View, Image, TextInput, AsyncStorage, ImageBackground, StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Button, Spinner } from './common';
import BaseURL from '../config';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      alert: '',
      loading: true
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
        console.log("Yosif zbal");


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
        alert('معلوماتك غلط يا كابتن');
        this.setState({ loading: false });
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
      <View style={pageStyle}>
      <StatusBar
         backgroundColor="grey"
      />
        <ImageBackground
          style={{ height: '100%', width: '100%' }}
          source={require('./images/blurBg.png')}
        >
        <View style={container}>
          <Image
            style={logo}
            source={require('./images/ftcLogoWhite.png')}
          />

          <View style={[sectionStyle]}>
            <TextInput
              placeholder={'الرقم الجامعي'}
              placeholderTextColor={'#fff'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={id => this.setState({ id })}
              value={this.state.id}
              style={{ textAlign: 'right', color: '#fff', opacity: 1 }}
            />
            <Icon type='material-community' name='account-outline' color='#fff' iconStyle={iconStyle} />
          </View>

          <View style={inputline} />

          <View style={sectionStyle}>
            <TextInput
              placeholder={'كلمة المرور'}
              placeholderTextColor={'#fff'}
              style={{ textAlign: 'right', color: '#fff', opacity: 1 }}
              onChangeText={password => this.setState({ password })}
              secureTextEntry
              value={this.state.password}
            />
            <Icon type='material-community' name='lock-outline' color='#fff' iconStyle={iconStyle} />
          </View>

          <View style={inputline} />

          <View style={button}>
            {this.renderButtonOrSpinner()}
          </View>

        </View>
        </ImageBackground>
      </View>

    );
  }
}

const styles = {
  container: {
    flexDirection: 'column',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'flex-start',
  },
  inputline: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#e5e5e5',
    opacity: 0.5,
    marginTop: 5
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
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 20
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
