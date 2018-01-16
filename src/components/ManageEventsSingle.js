import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';

class ManageEvents extends Component {
  render() {
    return (
      // <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      //   <Text style={{ fontSize: 30 }}>Events</Text>
      // </View>
      <Card>
      <Autocomplete
        data={data}
        defaultValue={query}
        onChangeText={text => this.setState({ query: text })}
        renderItem={data => (
          <TouchableOpacity onPress={() => this.setState({ query: data })}>
            <Text>{data}</Text>
          </TouchableOpacity>
        )}
      />
      </Card>
      );
  }

}

export default ManageEvents;
