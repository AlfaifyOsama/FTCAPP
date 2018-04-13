import React, { Component } from 'react';
import { StyleSheet, ScrollView, AsyncStorage, RefreshControl, Text, View } from 'react-native';
import axios from 'axios';
import { Card, ButtonGroup } from 'react-native-elements';
import Leaderboards from './Leaderboards';
import BaseURL from '../config';
import { Spinner } from './common';


class Points extends Component {

  state = { data: [], stats: [], index: 0, refreshing: false, loading: true };


  componentDidMount() {
    this.updateIndex(0);
    this.getInfo();
  }

  getInfo = async () => {
    const token = await AsyncStorage.getItem('token');
    // const id = await AsyncStorage.getItem('userID');
    // console.log('token: ',token);
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer ' + token }
    });
    instance.get(BaseURL + '/points/getAllPoints')
      .then((response) => {
        // console.log(response.data);
        // console.log(response.data[0]);
        if (response.status == 200) {
          this.setState({ data: response.data[0], stats: response.data[1] });
        }

      })
      .catch((error) => {
        //console.log(error.response);
        alert('فيه مشكلة، حاول مرة ثانية');
      });
      this.setState({ loading: false });
  }

  onNamePress = (user) => {
    const name = user.name;
    const avatar = BaseURL + '/users/getUserImage/' + user.id;
    const tels = [{ id: 1, name: 'Mobile', number: user.phone }];
    const emails = { id: 1, email: user.student_id + '@student.ksu.edu.da' };
    const socialAccounts = { snapchat: user.snapchat, twitter: user.twitter, 
      linkedin: user.linkedin, steam: user.steam };
    this.props.navigation.navigate('ProfileScreen', {
        name,
        bio: user.bio,
        avatar,
        tels,
        emails,
        userID: user.id,
        socialAccounts
    });
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
    onRowPress={(item, index) => this.onNamePress(item, index)}
    />);
  }


  displayStats = () => {
    const { statsStyle } = styles;

    return (<Card title='احصائيات'>
            <Text style={statsStyle}> مجموع النقاط : {this.state.stats.pointsTotal}</Text>
            <Text style={statsStyle}> عدد الاعضاء : {this.state.stats.numOfUsers}</Text>
            <Text style={statsStyle}> المتوسط : {this.state.stats.avgOfPoints}</Text>
            <Text style={statsStyle}> الوسيط : {this.state.stats.median}</Text>
            <Text style={statsStyle}> مجموع النقاط آخر اسبوع : {this.state.stats.lastWeekPoints}</Text>
            <Text style={statsStyle}> متوسط النقاط اخر اسبوع : {this.state.stats.lastWeekAvg}</Text>

          </Card>);
  }
  

  _onRefresh() {
    this.setState({ refreshing: true });
    this.updateIndex(0);
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
  statsStyle: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 20
  },
});

export default Points;
