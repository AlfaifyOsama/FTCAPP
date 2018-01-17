import React, { Component } from 'react';
import { Text, TouchableOpacity, ScrollView, View, AsyncStorage } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast, {DURATION} from 'react-native-easy-toast';
import BaseURL from '../config';
import axios from 'axios';

class Events extends Component {
  static navigationOptions = ({ navigation }) => {
    return { headerRight:
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ManageEvents')}
                      style={{ marginRight: 20 }}
                    >
                        <Ionicons
                          name={'ios-settings'}
                          size={26}
                          style={{ color: '#000' }}
                        />
                     </TouchableOpacity>,

              headerLeft:
                      <TouchableOpacity
                        onPress={() => navigation.navigate('AddEvent')}
                        style={{ marginLeft: 20 }}
                      >
                          <Ionicons
                            name={'md-add'}
                            size={26}
                            style={{ color: '#000' }}
                          />
                       </TouchableOpacity>
            };
  }

  state = { events: [], loading: false } ;

  componentDidMount() {
    this.getEvents();
  }

  onJoinEventClick = async (eventId) => {
    this.setState({ loading: true });
    const token = await AsyncStorage.getItem('token');
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer ' + token }
    });
    instance.post(BaseURL + '/events/join', { event_id: eventId })
    .then((response) => {
      this.refs.toast.show('اضفناك بالمشروع، ياويلك تسحب!',500);
      this.getEvents();
      // the last line will request the events again so
      // the events that was just registered to will be disabled,
      // go down to the bottom of the page!
    })
      .catch((error) => {
        alert('صارت مشكلة بالطلب، جرب مرة ثانية');
      });
      this.setState({ loading: false });
  }

  getEvents = async () => {
    const token = await AsyncStorage.getItem('token');
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer ' + token }
    });
    instance.get(BaseURL + '/events/getReadyEvents')
    .then((response) => {
      this.setState({ events: response.data });
    })
      .catch((error) => {
      });
  }

  buttonIsDisabled(project) {
    if (project.full || this.state.loading || project.isRegistered) {
      return true;
    }
    return false;
  }

  renderButtonTitle(project) {
    if (project.isRegistered) {
      return 'تم تسجيلك مسبقاً في المشروع';
    } else if (project.full) {
      return 'اكتمل عدد الأعضاء';
    } else if (project.type === 'ORGANIZE') {
      return 'شارك في التنظيم';
    } else if (project.type === 'ATTEND') {
      return 'احضر الفعالية';
    }
  }

  renderButtonIconName(project) {
    if (project.type === 'ORGANIZE') {
      return 'handshake-o';
    }
    return 'smile-o';
  }

renderAppropriateButton(project) {
  const isDisabled = this.buttonIsDisabled(project);
  const title = this.renderButtonTitle(project);
  const iconName = this.renderButtonIconName(project);
  return (
    <Button
      backgroundColor='#03A9F4'
      buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
      title={title}
      rightIcon={{ name: iconName, type: 'font-awesome' }}
      onPress={() => this.onJoinEventClick(project.id)}
      disabled={isDisabled}
    />
  );
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
            قائد المشروع: {item.leader}
            </Text>
            {this.renderAppropriateButton(item)}
          </Card>
        </View>
    ))
      }
      <Toast position='center' ref="toast"/>
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

export default Events;
