import React, { Component } from 'react';
import { Text, ScrollView, View, AsyncStorage } from 'react-native';
import { Card, Button } from 'react-native-elements';
import axios from 'axios';
import BaseURL from '../config';

class ManageEvents extends Component {
  state = { events: [] } ;

  componentDidMount() {
    this.getEvents();
  }

  getEvents = async () => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userID');
    console.log(userId);
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer ' + token }
    });
    instance.get(BaseURL + '/events/getLeaderEvents/' + userId)
    .then((response) => {
      this.setState({ events: response.data });
      console.log(response.data);
    })
      .catch((error) => {
        alert('التطبيق زعلان عليك.. جرب مره ثانيه');
      });
  }


render() {
  console.log(this.state.events);
  return (
    <ScrollView style={{ backgroundColor: '#ECF2F4' }}>
      {
        this.state.events.map((item, i) => (
        <View
          style={[{ paddingBottom: i === this.state.events.length - 1 ? 20 : 0 }, styles.pageStyle]}
          key={i}
        >
          <Card title={item.name} key={i}>
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
                onPress={() => this.props.navigation.navigate('SubmitWork')}
              />
              <Button
                backgroundColor='#03A9F4'
                buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='ادارة المشروع'
                rightIcon={{ name: 'account-settings-variant', type: 'material-community' }}
                onPress={() => this.props.navigation.navigate('ManageEventsSingle')}
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
