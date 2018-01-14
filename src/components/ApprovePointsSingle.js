import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TextInput, AsyncStorage } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import AnimatedHideView from 'react-native-animated-hide-view';
import axios from 'axios';
import BaseURL from '../config';
import Toast, {DURATION} from 'react-native-easy-toast'
import { Spinner } from './common';

class ApprovePointsSingle extends Component {
    state = { members: [], inputs: [], event_ID: '', loading: true, isChildVisible: [] };
// define the view
    getInfo = async () => {
     const token = await AsyncStorage.getItem('token');
    // console.log('token',token);
     const instance = axios.create({
     timeout: 5000,
     headers: { 'Authorization': 'Bearer '+  token }
     });
     instance.get(BaseURL + '/events/8/getRecordedWork')
       .then((response) => {
         //console.log(response.data.users);
         this.state.event_ID = response.data.id;
         response.data.users.map((item, i) => (
           this.state.members[i] = item,
           this.state.isChildVisible[i] = true
         ));

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

    componentDidMount() {
       this.getInfo();
    }
    validate = (index,lengthOfRecodedWork) => {
      for(i=0 ; i< lengthOfRecodedWork; i++){
        const value = this.state.inputs[index+''+i];
        if(value === undefined || value < 0 || value === '' || isNaN(value)){
          return false;
        }
      }
        return true;
    }
    OnPress = async (index) => {

      let RecordedWork = this.state.members[index]['points'];
      let values = [];

      if (!this.validate(index, RecordedWork.length)) {
        alert('عندك مشكلة، تأكد ان كل الارقام صحيحة وانك رصدت جميع الاشغال للعضو هذا');
        return;
      }
      RecordedWork.map((work, i) => (

        values[i] = {
          id: work.id,
          value: this.state.inputs[index+''+i]
        }
      ));

      const token = await AsyncStorage.getItem('token');
      const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer ' + token }
      });
      instance.put(BaseURL + '/points/approve', {
        data: values,
      }).then((response) => {
        console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      //console.log('aa',this.state.event_ID);
      this.state.isChildVisible[index] = false;
        this.setState({
          loading: false
        });
        this.refs.toast.show('تم :)',500);
    }
    renderSingleCard = (item, index) => {

      if (this.state.isChildVisible[index] === false) {
          return <View />;
      }
          const { singleWorkStyle, workTextStyle, line } = styles;


       return (<AnimatedHideView
        visible={this.state.isChildVisible[index]}
          >
        <View style={[{ marginBottom: index === this.state.members.length - 1 ? 20 : 0 }, styles.pageStyle]} key={index} >
          <Card title={item.first_name + ' ' + item.last_name } key={index}>
            {
              item.points.map((work, indexWork) => {
                return (
                  <View style={singleWorkStyle} key={indexWork}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                      <TextInput
                        placeholder={'00'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={(text) => (this.state.inputs[index+''+indexWork] = text)}

                        value={this.state.inputs[index+''+indexWork]}
                        style={{ textAlign: 'right' }}
                        maxLength={2}
                      />

                      <Text style={workTextStyle}>{work.description}</Text>
                    </View>
                    <View style={line} />
                  </View>
                );
              })
            }
            <Button
            onPress={ () => this.OnPress(index)}
              title='ارصدها'
              rightIcon={{ name: 'done' }}
              backgroundColor='#9ccc65'
              style={{ alignSelf: 'center' }}
              rounded
            />
          </Card>
        </View>

        </AnimatedHideView>

       );
    }
  renderCards() {
    return this.state.members.map((item, index) => (
      <View>
    { this.renderSingleCard(item, index) }

      </View>

    ));
  }

  render() {
    if (this.state.loading) {
      return this.renderSpinner();
    } else if(this.state.members.length ==0 ){ // nothing to approve
         return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text style={{ fontSize: 30 }}>فارغة كحياتي بدونك :)</Text>
           </View>
                );
        }
    return (
      <ScrollView>
        { this.renderCards() }
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


export default ApprovePointsSingle;
