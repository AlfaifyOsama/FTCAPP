import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Points extends Component {
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ fontSize: 30 }}>Points</Text>
      </View>
    );
  }

}

export default Points;
