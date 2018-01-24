import React, { Component } from 'react';
import { StyleSheet, ScrollView, AsyncStorage, RefreshControl, Text, View } from 'react-native';
import axios from 'axios';
import { Card, Divider, ButtonGroup } from 'react-native-elements';
import normalize from 'react-native-elements/src/helpers/normalizeText';
import Leaderboards from './Leaderboards';
import BaseURL from '../config';
import { Spinner } from './common';


class Points extends Component {

  state = { data: [], avg: 0.0, index: 0, refreshing: false, loading: true };


  componentDidMount() {
    this.updateIndex(0);
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
      this.setState({ loading: false });
  }

  updateIndex = (index) => {
    this.setState({ index });
  }

  displayLeaderBoard = () => {
    return (<Leaderboards
    data={this.state.data}
    sortBy='value'
    labelBy='name'
    icon='true'
    />);
  }

  displayStats = () => {
    return (<Card title='احصائيات'>
            <Text style={{ marginBottom: 25, textAlign: 'center' }}>
            الاحصائية الاولى
            </Text>
            <Text style={{ marginBottom: 10, textAlign: 'center' }}>
            قائد المشروع: 
            </Text>
          </Card>);
  }
  

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getInfo();
    this.setState({ refreshing: false });
  }

  render() {
    if (this.state.loading){
      return (<Spinner />);
      }
      const buttons = ['Hello', 'World'];
      const { selectedIndex } = this.state
    
 
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
            <ButtonGroup
      selectedBackgroundColor="pink"
      onPress={this.updateIndex}
      selectedIndex={this.state.index}
      buttons={['قائمة النقاط', 'الاحصائيات']}
      containerStyle={{height: 30 }}
            />
      <View>
        {this.state.index === 0 ? this.displayLeaderBoard() : this.displayStats()}
        </View>
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
