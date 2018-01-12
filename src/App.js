// import { AsyncStorage } from 'react-native';
// import Home from './components/Home';
// import LoginForm from './components/LoginForm';
// import { Spinner } from './components/common';
//
// class App extends Component {
//   state = { loggedIn: null }
//
//   componentDidMount() {
//     const value = AsyncStorage.getItem('id')._55;
//     if (value !== null) {
//       this.setState({ loggedIn: true });
//     } else {
//       this.setState({ loggedIn: false });
//     }
//   }
//   renderContent() {
//     switch (this.state.loggedIn) {
//       case true:
//         return <Home />;
//       case false:
//         return <LoginForm />;
//       default:
//         return <Spinner size='large' />;
//     }
//   }
//
//   render() {
//     return (this.renderContent());
//   }
// }
//
// export default App;
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
