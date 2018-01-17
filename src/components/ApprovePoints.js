import React, { Component } from 'react';
import { Text, View, ScrollView, AsyncStorage } from 'react-native';
import { Card, Button } from 'react-native-elements';
import axios from 'axios';
import BaseURL from '../config';

class ApprovePoints extends Component {


  state = { events: [] };

  componentDidMount() {
    this.getEvents();
  }

  getEvents = async () => {
    const token = await AsyncStorage.getItem('token');
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer ' + token }
    });
    instance.get(BaseURL + '/events/PendingWorkEvents')
    .then((response) => {
      this.setState({ events: response.data});
    })
      .catch((error) => {
        console.log(error);
      });
  }

  onPress = (id) => {
    this.props.navigation.navigate('ApprovePointsSingle',{
      event_id: id
    });
  }

  render() {
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
        قائد المشروع: {item.first_name + ' ' + item.last_name}
        </Text>
        <Button
          backgroundColor='#03A9F4'
          buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title='ارصدني'
          rightIcon={{ name: 'checkbox-multiple-marked-outline', type: 'material-community' }}
          onPress={() => this.onPress(item.id)}
        />

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

export default ApprovePoints;
