import React, { Component } from 'react';
import { StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import axios from 'axios';
import { Text, View } from 'native-base';
import Leaderboards from './Leaderboards';
import BaseURL from '../config';

class Points extends Component {


  state = { data: [] };

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const token = await AsyncStorage.getItem('token');
    // console.log('token: ',token);
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer '+  token }
      });
      instance.get(BaseURL + '/points/getAllPoints')
        .then((response) => {
          console.log(response.data[0]);
          if(response.status == 200){
            this.setState({data: response.data[0] });
          }
 
        })
        .catch((error) => {
          console.log(error.response);
         alert('فيه مشكلة، حاول مرة ثانية');
        });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Leaderboards
          data={this.state.data}
          sortBy='value'
          labelBy='name'
          icon='true'
        />
      </ScrollView>
    );
  }

}

let styles = StyleSheet.create({

  top: {
    marginLeft: 0,
    backgroundColor: '#2E7D32',
    marginBottom: 3,
    height: 'auto',
    borderWidth: 0,
  },

  regular: {
    marginLeft: 0,
    backgroundColor: '#1565C0',
    marginBottom: 3,
    height: 'auto',
    borderWidth: 0,
  },

  garbage: {
    marginLeft: 0,
    backgroundColor: '#C62828',
    marginBottom: 3,
    height: 'auto',
    borderWidth: 0,
  }
});

export default Points;