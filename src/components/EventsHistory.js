import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TextInput, AsyncStorage, RefreshControl } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import AnimatedHideView from 'react-native-animated-hide-view';
import axios from 'axios';
import BaseURL from '../config';
import Toast, { DURATION } from 'react-native-easy-toast'
import { Spinner } from './common';

class EventsHistory extends Component {
  state = { data: [], loading: true, user_id: '', refreshing: false };
  // define the view

  componentDidMount() {
    this.getInfo();
  }


  getInfo = async () => {
    this.state.user_id = await AsyncStorage.getItem('userID');
    //console.log('eventID', this.state.user_id);
    const token = await AsyncStorage.getItem('token');
    // console.log('token',token);
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer ' + token }
    });
    instance.get(BaseURL + '/events/getUserEventsWithWork/' + this.state.user_id)
      .then((response) => {
        //console.log(response.data.users);
        this.state.data = response.data;
        this.setState({
          loading: false
        });

      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderSpinner() {
    return <Spinner />;
  }

  renderSingleCard = (item, index) => {
    const { singleWorkStyle, workTextStyle, line } = styles;

    if (item.work.length === 0) {
      return (

        <View style={[{ marginBottom: index === this.state.data.length - 1 ? 20 : 0 }, styles.pageStyle]} key={'View' + item.id} >
          <Card title={item.name} key={'Card' + item.id}>
            <View style={singleWorkStyle} key={'WorkView' + item.id}>
              <View key={'InputView' + item.id} style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }} >
                <Text key={'Description' + item.id} style={workTextStyle}>ما تم توثيق شغلك حتى الأن</Text>
              </View>
              <View key={'line' + item.id} style={line} />
            </View>


          </Card>
        </View>



      );
    }
    return (
      <View style={[{ marginBottom: index === this.state.data.length - 1 ? 20 : 0 }, styles.pageStyle]} key={'View' + item.id} >
        <Card title={item.name} key={'Card' + item.id}>
          {
            item.work.map((singleWork, indexWork) => {
              return (
                <View style={singleWorkStyle} key={'WorkView' + item.id + indexWork}>
                  <View key={'InputView' + item.id + indexWork} style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }} >
                    <Text key={'Description' + item.id + '' + indexWork} style={workTextStyle}>{singleWork.description}</Text>
                  </View>
                  <View key={'line' + item.id + '' + indexWork} style={line} />
                </View>
              );
            })
          }
        </Card>
      </View>
    );
  }
  renderCards() {
    return this.state.data.map((item, index) => (
      <View key={'mainView' + item.id}>
        {this.renderSingleCard(item, index)}

      </View>

    ));
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getInfo();
    this.setState({ refreshing: false });
  }

  render() {
    if (this.state.loading) {
      return this.renderSpinner();
    } else if (this.state.data.length === 0) { // nothing to approve
      return (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          <View
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          >

            <Text style={{ fontSize: 30 }}>فارغة كحياتي بدونك :)</Text>
          </View>
        </ScrollView>
      );
    }
    return (
      <ScrollView
        style={{ backgroundColor: '#ECF2F4' }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        {this.renderCards()}
        <Toast position='center' ref="toast" />
      </ScrollView>
    );
  }
}

const styles = {
  pageStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ECF2F4',
  },
  singleWorkStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20
  },
  workTextStyle: {
    fontSize: 14,
    textAlign: 'right',
    marginLeft: 0,
    marginRight: 0,
    color: '#515151'
  },
  line: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    borderTopWidth: 1,
    borderColor: '#e5e5e5'
  },
};


export default EventsHistory;
