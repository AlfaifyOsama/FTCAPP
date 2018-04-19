import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage, RefreshControl, TextInput } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AwesomeAlert from 'react-native-awesome-alerts';

import axios from 'axios';
import BaseURL from '../config';
import { Spinner } from './common';

export default class RecordMyWork extends Component {
  state = { events: [], inputs: [], loading: true, refreshing: false, showAlertLoading: false };

  componentDidMount() {
    this.getInfo();
  }

  // returns the list of user registered events.
  getInfo = async () => {

    const token = await AsyncStorage.getItem('token')
    const userID = await AsyncStorage.getItem('userID');
    // console.log('token',token);
    const instance = axios.create({
      timeout: 1000,
      headers: { 'Authorization': 'Bearer ' + token }
    });
    instance.get(BaseURL + '/users/'+ userID +'/getEventsWithSelfSubmittedWork')
      .then((response) => {
         //console.log(response.data);

        response.data.map((item, i) => (
          this.state.events[i] = response.data[i]
        ));

        this.setState({
          loading: false,
        });
      })
      .catch((error) => {
         //console.log(error.response);
        alert('فيه مشكلااا صديق');
        this.setState({
          loading: false,
          showAlertLoading: true,
        });
      });
  }

  OnPress = async (index) => {
    const text = this.state.inputs[index];

    if (text === undefined || text === '' || text == null || text.length < 10) {
      alert('مب على كيفك، لازم تكتب 10 حروف على الاقل');
      return;
    }
    this.setState({
      showAlertLoading: true
    });
    const token = await AsyncStorage.getItem('token');
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer ' + token }
    });
    instance.post(BaseURL + '/points/submitSelfRecordedWork', {
      event_id: this.state.events[index].id,
      description: text
    }).then((response) => {
      // console.log(response);
      //
      this.state.inputs = []; // erase the inputs
      this.getInfo();
    })
      .catch((error) => {
        //  console.log(error);
      });
  }

  renderSpinner() {
    return <Spinner />;
  }

  renderSingleCard = (item, index) => {

    const { singleWorkStyle, workTextStyle, line } = styles;

    return (
      <View key={'CardMainView' + item.id} style={[{ marginBottom: index === this.state.events.length - 1 ? 20 : 0 }, styles.pageStyle]}  >
        <Card key={'Card' + item.d} title={item.name} containerStyle={{ borderRadius: 10 }}>

      {
            item.selfSubmittedWork.map((work, indexWork) => {
               return (
                    <View key={'workView' + item.id + indexWork} style={singleWorkStyle} >
                       <TextInput
                       key={'textInput' + item.id + indexWork}
                       multiline
                       numberOfLines={2}
                       value={work.description}
                       editable={false}
                       style={{ textAlign: 'center', width: '100%' }}
                        />

                       <View key={'line' + item.user_id + indexWork} style={line} /> 
                    </View>
               );
            })
      }
          
          {/* the line that he writes on */}
          <View key={'writingLine' + item.d} style={singleWorkStyle} >
            <TextInput
              multiline
              placeholder={'وش سويت؟'}
              autoCapitalize={'none'}
              numberOfLines={2}
              autoCorrect={false}
              onChangeText={(text) => (this.state.inputs[index] = text)}
              value={this.state.inputs[index]}
              style={{ textAlign: 'center', width: '100%' }}
            />

            <View key={'lastLine' + item.id} style={line} />
          </View>
          <Button
            key={'Submitbutton' + item.id}
            onPress={() => this.OnPress(index)}
            title='سجلها'
            rightIcon={{ name: 'done' }}
            backgroundColor='#9ccc65'
            style={{ alignSelf: 'center' }}
            rounded
          />
        </Card>
      </View>

    );
  }
  renderCards() {
    return this.state.events.map((item, index) => (
      <View key={'mainView'+ index} >
        {this.renderSingleCard(item, index)}
      </View>
    ));
  }

  render() {
    if (this.state.loading) {
      return this.renderSpinner();
    } else if (this.state.events.length == 0) { // nothing to approve
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#ECF2F4' }}>
          <Text style={{ fontSize: 30 }}>ما عندك مشاريع يافندم</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#ECF2F4' }}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps='always' extraScrollHeight={60}>
      <Card containerStyle={{ borderRadius: 10, alignItems: 'center', }} title={'تعليمات'} >
        <Text style={{ fontWeight: 'bold', fontSize: 13, textAlign: 'right' }}>
        •أكتب وش سويت لهذا المشروع، كلامك بيروح لقائد المشروع عشان يعتمده. {'\n'}
        </Text>    
      </Card>
        {this.renderCards()}
      </KeyboardAwareScrollView>
      <AwesomeAlert
        show={this.state.showAlertLoading}
        showProgress
        title="لحظات"
        message="جاري تنفيذ طلبك.."
        closeOnTouchOutside
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
      />
      </View>


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
    width: '100%'

    // paddingRight: 20,
    // paddingLeft: 20
  },
  workTextStyle: {
    fontSize: 14,
    textAlign: 'right',
    marginLeft: 40,
    marginRight: 15,
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

