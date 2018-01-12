import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import LoginForm from './components/LoginForm';

const Screens = StackNavigator({
  Login: {
    screen: LoginForm,
    navigationOptions: {
      header: null,
      style: { backgroundColor: '#fff' }
    }
  },
  Home: { screen: Home,  
    navigationOptions: {
    header: null,
    style: { backgroundColor: '#fff' }
  } }
}, {
      headerMode: 'screen',
      cardStyle: { backgroundColor: '#fff'
   }
});

export default class App extends React.Component {

  render() {
    return (
      <Screens />
    );
  }
}
