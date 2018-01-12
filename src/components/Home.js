import React, { Component } from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Spinner } from './common';

class Home extends Component {
  state = { id: '', password: '', alert: '', loading: false }

  onButtonPress() {
     //const loggedIn = Login(this.state.id, this.state.password);
     // to be edited.
  }

  onLoginSuccess() {
    this.setState({
      id: '',
      password: '',
      alert: '',
      loading: false
    });
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
      return <Spinner size={'small'} />;
    }
      return <Button text={'دخول'} onPress={this.onButtonPress.bind(this)} />;
  }

  render() {
    return (
      <View style={styles.container}>

        <Image
        style={styles.logo}
        source={require('./images/logo.jpg')}
        />

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

export default Home;
