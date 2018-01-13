import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RootTabs from './components/RootTabs';

export default class App extends React.Component {

  render() {
    return (
      <RootTabs />
    );
  }
}
