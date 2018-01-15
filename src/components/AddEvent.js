import React, { Component } from 'react';
import { Text, TouchableOpacity, AsyncStorage, View } from 'react-native';
import { Card } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';
import BaseURL from '../config';

class ManageEvents extends Component {
  state = { members: [], selected: [], query: '' }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
   const token = 'Bearer ' + await AsyncStorage.getItem('token');

   const instance = axios.create({
   timeout: 5000,
   headers: { 'Authorization': token }
   });
   instance.get(BaseURL + '/users/getAll')
     .then((response) => {
       this.setState({
         members: response.data
       });
     })
     .catch((error) => {
       alert('فيه غلط صار وما كان لي خلق اصلحه، جرب مره ثانيه :)');
     });
  }

  renderNames(query) {
    if (query === '') {
      return [];
    }

    const { members } = this.state;
    const tmp = members.filter((member) => (member.first_name + ' ' + member.last_name).includes(query));
    return tmp.map((member) => <Text key={member.id} style={{ textAlign: 'right' }}>{member.first_name + ' ' + member.last_name}</Text>);
  }

  onNamePress = (data) => {
    console.log(data);
    this.setState({ query: '', selected: this.state.selected.push(data.props.children) });
  }

  renderSelectedNames = () => {
    if(this.state.selected.length > 0)
      return this.state.selected.map((member) => (<Text>{member}</Text>));
  }

  render() {
    const { query } = this.state;
    const names = this.renderNames(query);
    return (
      <Card>
        <Autocomplete
          data={names}
          defaultValue={query || ''}
          onChangeText={text => this.setState({ query: text })}
          renderItem={data => (
            <TouchableOpacity onPress={() => this.onNamePress(data)}>
              <Text style={{ textAlign: 'right', marginTop: 10, paddingTop: 5, paddingBottom: 5, paddingRight: 10 }}>{data}</Text>
            </TouchableOpacity>
          )}
        />
        <View style={{ backgroundColor: '#000', flex: 1 }}>
          {
              this.renderSelectedNames()
          }
        </View>
      </Card>
      );
  }

}

export default ManageEvents;
