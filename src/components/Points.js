import React, { Component } from 'react';
import { StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import axios from 'axios';
import { Text, View } from 'native-base';
import Leaderboards from './Leaderboards';
import BaseURL from '../config';

class Points extends Component {

<<<<<<< HEAD
  constructor(props) {
    super(props);

    this.state = {
      index: '0',
      data: [
        // {
        //   name: 'Dark Souls',
        //   nickname: 'Best Game!',
        //   points: '9000'
        // },
        // {
        //   name: 'Demon Souls',
        //   nickname: 'Best Game!',
        //   points: '8000'
        // },
        // {
        //   name: 'Borderlands',
        //   nickname: 'Pretty good!',
        //   points: '1100'
        // },
        // {
        //   name: 'Monster Hunter',
        //   nickname: 'Don\'t disappoint me please',
        //   points: '100'
        // },
      ]
    };

  }

  
=======

  state = { data: [] };

>>>>>>> b3958f4ae5cb2052541f471a335ea608e516839c
  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('token: ',token);
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