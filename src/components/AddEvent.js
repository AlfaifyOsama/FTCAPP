import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

class AddEvent extends Component {
  render() {
    return (
      // <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      //   <Text style={{ fontSize: 30 }}>Events</Text>
      // </View>
      <Text style={{ flex: 1, alignSelf: 'center' }}>
        Add Event Page
      </Text>
      );
  }

}

export default AddEvent;
