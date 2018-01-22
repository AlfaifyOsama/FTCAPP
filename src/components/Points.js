import React, { Component } from 'react';
import { StyleSheet, ScrollView, AsyncStorage, RefreshControl, Text, } from 'react-native';
import axios from 'axios';
import Leaderboards from './Leaderboards';
import BaseURL from '../config';
import normalize from 'react-native-elements/src/helpers/normalizeText';


class Points extends Component {

  state = { data: [], avg: 0.0, refreshing: false, };

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('userID');
    // console.log('token: ',token);
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer ' + token }
    });
    instance.get(BaseURL + '/points/getAllPoints')
      .then((response) => {
        // console.log(response.data[1]);
        // console.log(response.data[0]);
        if (response.status == 200) {
          this.setState({ data: response.data[0], avg: response.data[1].avgOfPoints });
        }

      })
      .catch((error) => {
        console.log(error.response);
        alert('فيه مشكلة، حاول مرة ثانية');
      });

  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getInfo();
    this.setState({ refreshing: false });
  }

  render() {
    return (
      <ScrollView
      style={{ flex: 1, backgroundColor: '#ECF2F4' }}
      refreshControl={
        <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        <Text style={styles.avg}>المتوسط: {this.state.avg}</Text>
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
  },
  avg: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: normalize(30),
    marginTop: 0,
    width: 'auto',
    backgroundColor: '#42A5F5',
  },
});

export default Points;
