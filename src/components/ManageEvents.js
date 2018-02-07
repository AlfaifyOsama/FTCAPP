import React, { Component } from 'react';
import { Text, ScrollView, View, AsyncStorage, RefreshControl, Keyboard } from 'react-native';
import { Card, Button } from 'react-native-elements';
import axios from 'axios';
import BaseURL from '../config';
import { Spinner } from './common';

class ManageEvents extends Component {
  state = { events: null, refreshing: false, loading: true };

  componentDidMount() {
    this.setState({ loading: true });
    this.getEvents();
  }

  getEvents = async () => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userID');
    console.log('id', userId);
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer ' + token }
    });
    instance.get(BaseURL + '/events/getLeaderEvents/' + userId)
      .then((response) => {
        this.setState({ events: response.data });
        this.setState({ loading: false });
        //console.log(response.data);
      })
      .catch((error) => {
        alert('التطبيق زعلان عليك.. جرب مره ثانيه');
        this.setState({ loading: false });
      });

  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getEvents();
    this.setState({ refreshing: false });
  }

  render() {
    Keyboard.dismiss();
    if (this.state.loading === true) {
      return (<Spinner />);
    }
    else if (this.state.events == null || this.state.events.length === 0) {
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
        {
          this.state.events.map((item, i) => (
            <View
              style={[{ paddingBottom: i === this.state.events.length - 1 ? 20 : 0 }, styles.pageStyle]}
              key={i}
            >
              <Card title={item.name} key={i} containerStyle={{ borderRadius: 10 }}>
                <Text style={{ marginBottom: 25, textAlign: 'center' }}>
                  {item.description}
                </Text>
                <Text style={{ marginBottom: 10, textAlign: 'center' }}>
                  قائد المشروع: {item.leader}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Button
                    backgroundColor='#03A9F4'
                    buttonStyle={{ borderRadius: 20 }}
                    title='رصد الأعمال'
                    rightIcon={{ name: 'checkbox-multiple-marked-outline', type: 'material-community' }}
                    onPress={() => this.props.navigation.navigate('SubmitWork', {
                      event: item
                    })
                    }
                  />
                  <Button
                    backgroundColor='#03A9F4'
                    buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    title='ادارة المشروع'
                    rightIcon={{ name: 'account-settings-variant', type: 'material-community' }}
                    onPress={() => this.props.navigation.navigate('ManageEventsSingle', { eventId: item.id })}
                  />
                </View>
              </Card>
            </View>
          ))
        }
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
};

export default ManageEvents;
