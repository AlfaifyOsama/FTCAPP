import axios from 'axios';
import React, { Component } from 'react';
import { View, Image, TextInput, AsyncStorage } from 'react-native';
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

    axios.post(BaseURL + '/users/login', {
      student_id: this.state.id,
      password: this.state.password
    })
      .then((response) => {
        //console.log(response);

        let token = response.data[0]['token'];
        let userID = response.data["user"]["id"] +'';
        let firstName = response.data["user"]["first_name"];
        let lastName = response.data["user"]["last_name"];
        let studentID = response.data["user"]["student_id"] +'';

        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('userID', userID);
        AsyncStorage.setItem('firstName', firstName);
        AsyncStorage.setItem('lastName', lastName);
        AsyncStorage.setItem('studentID', studentID);

        this.setState({ loading: false });
        this.renderButtonOrSpinner();
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
  //  // value !== null && value !==''
  //   if (true) { // user has loggen in
  //     this.props.navigation.navigate('Home');
  //   } else {
  //     this.setState({ loading: false });
  //   }
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
    if (this.state.loading) {
      return this.renderSpinner();
    }

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <Image
          style={styles.logo}
          source={require('./images/logo.jpg')}
        />

        <TextInput
          placeholder={'الرقم الجامعي'}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={id => this.setState({ id })}
          value={this.state.id}
          style={{ textAlign: 'right' }}
        />

        <View style={styles.inputline} />

        <TextInput
          placeholder={'كلمة المرور'}
          style={{ marginTop: 15, textAlign: 'right' }}
          onChangeText={password => this.setState({ password })}
          secureTextEntry
          value={this.state.password}
        />

        <View style={styles.inputline} />

        <View style={styles.button}>
          {this.renderButtonOrSpinner()}
        </View>

      </View>

    );
  }
}

const styles = {
  container: {
    flexDirection: 'column',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 40,
  },
  button: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  inputline: {
    width: '100%',
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#e5e5e5'
  },
  logo: {
    alignSelf: 'center',
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  }
};
