import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

class ManageEvents extends Component {
  render() {
    return (
      // <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      //   <Text style={{ fontSize: 30 }}>Events</Text>
      // </View>
      <Card title='HELLO WORLD'>
        <Text style={{ marginBottom: 10 }}>
          The idea with React Native Elements is more about component structure than actual design.
        </Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor='#03A9F4'
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title='VIEW NOW'
        />
      </Card>
      );
  }

}

export default ManageEvents;
