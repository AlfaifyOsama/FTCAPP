import React, { Component } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { List, ListItem } from 'react-native-elements';


export default class Home extends Component {
  state = { options: [] } ;

    componentDidMount() {
      this.setState({
        options: [
          {
            title: 'Appointments',
            icon: 'av-timer'
          },
          {
            title: 'Trips',
            icon: 'flight-takeoff'
          }
         ]
    });
  }


  render() {
    return (
       <View >
      <List>
  {
    this.state.options.map((item, i) => (
      <ListItem
        key={i}
        title={item.title}
        leftIcon={{name: item.icon}}
      />
    ))
  }
</List>
      </View>
      );
  }
}
