import React, { Component } from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Spinner } from './common';
import Login from '../requests';

class LoginForm extends Component {
  state = { email: '', password: '', alert: '', loading: false }


  onButtonPress() {
    Login(435102878, 1256);
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      alert: '',
      loading: false
    });
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
      return <Spinner size={'small'} />;
    }
      return <Button onPress={this.onButtonPress.bind(this)} text={'Login'} />;
  }

  render() {
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
        />
        <View style={styles.inputline} />
        <TextInput placeholder={'كلمة المرور'} style={{ marginTop: 15 }} />
        <View style={styles.inputline} />

        <View style={styles.button}>
          <Button
          text={'دخول'}
          onPress={this.onButtonPress.bind(this)}
          />
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
    marginTop: 40
  },
  button: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-start',
    height: 30
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

export default LoginForm;
