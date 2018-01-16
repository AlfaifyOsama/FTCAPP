import React, { Component } from 'react';
import { Text, TouchableOpacity, AsyncStorage, View, Picker, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import axios from 'axios';
import BaseURL from '../config';

class AddEvent extends Component {
  state = { members: [],
            selected: [],
            query: '',
            projectName: '',
            projectDisc: '',
            type: 'ATTEND',
            maxNumOfMembers: 0
          }

  componentDidMount() {
    this.getInfo();
  }

  onNamePress = (data) => {
    console.log(data);
    console.log(this.state.selected);
    this.state.selected.push(data.props.children);
    this.setState({ query: '' });
  }


  getInfo = async () => {
   const token = 'Bearer ' + await AsyncStorage.getItem('token');

   const instance = axios.create({
   timeout: 5000,
   headers: { 'Authorization': token }
   });
   instance.get(BaseURL + '/users/getAll')
     .then((response) => {
       this.setState({
         members: response.data
       });
     })
     .catch((error) => {
       alert('فيه غلط صار وما كان لي خلق اصلحه، جرب مره ثانيه :)');
     });
  }

  renderNames(query) {
    if (query === '') {
      return [];
    }

    const { members } = this.state;
    const tmp = members.filter((member) => (member.first_name + ' ' + member.last_name).includes(query));
    return tmp.map((member, i) =>
      <Text key={member.id} style={{ textAlign: 'right' }}>{member.first_name + ' ' + member.last_name}</Text>);
  }

  renderSelectedNames = () => {
    if(this.state.selected.length > 0)
      return this.state.selected.map((member, i) => (
        i === 0 ? <Text style={{ color: '#515151' }} key={i}> {member} </Text> : <Text style={{ color: '#515151' }} key={i}> {member}،</Text>
      ));
  }

  getNumbersTo60() {
    const numbers = [];
    for (let i = 1; i <= 60; i++) {
      numbers.push({ value: i });
    }
    return numbers;
  }

  render() {
    const radioProps = [
      { label: 'نحتاج منظمين', value: 'ORGANIZE', index: 0 },
      { label: 'التسجيل للمشاركة', value: 'ATTEND', index: 1 }
    ];
    const { query } = this.state;
    const names = this.renderNames(query);
    return (
      <View>
      <View style={{ paddingBottom: 15 }}>
      <Card>
        <TextField
          label='اسم المشروع'
          value={this.state.projectName}
          onChangeText={(projectName) => this.setState({ projectName })}
          inputContainerStyle={{ alignItems: 'flex-end' }}
        />

        <TextField
          label='وصف المشروع'
          value={this.state.projectDisc}
          onChangeText={(projectDisc) => this.setState({ projectDisc })}
          inputContainerStyle={{ alignItems: 'flex-end' }}
          title='لا تسلك، الوصف: وصفك الشي‌ء بحليته (يَصِفُ) وَصْفًا ، ووُصوفًا'
          titleTextStyle={{ textAlign: 'right' }}
          multiline
        />

        <Text style={{ textAlign: 'right', marginBottom: 5, marginTop: 30 }}>المشاركين مبدئيا: </Text>
        <Autocomplete
          placeholder={'اكتب هنا المشاركين مبدئياً'}
          place
          data={names}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          renderItem={data => (
            <TouchableOpacity onPress={this.onNamePress.bind(this, data)}>
              <Text style={{ textAlign: 'right', marginTop: 10, paddingTop: 5, paddingBottom: 5, paddingRight: 10 }}>{data}</Text>
            </TouchableOpacity>
          )}
          inputContainerStyle={{ borderRadius: 10, alignItems: 'flex-end', paddingRight: 10 }}

        />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 }}>
          {
              this.renderSelectedNames()
          }
        </View>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
        <RadioForm
          formHorizontal
          animation
        >
          {radioProps.map((obj, i) => {
            return (
              <RadioButton labelHorizontal={true} key={i} style={{ marginLeft: 15 }}>
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                labelStyle={{ fontSize: 15, color: '#000' }}
                labelWrapStyle={{}}
              />
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={this.state.type === obj.value}
                borderWidth={3}
                buttonInnerColor={'#03A9F4'}
                buttonOuterColor={this.state.type === obj.value ? '#03A9F4' : '#03A9F4'}
                buttonSize={15}
                buttonOuterSize={25}
                buttonStyle={{ }}
                buttonWrapStyle={{ marginLeft: 10 }}
              />
              </RadioButton>);
          })}

          </RadioForm>
        </View>
        <View style={{ width: '60%', alignSelf: 'flex-end' }}>
        <Dropdown
          label='الحد الاعلى للمشاركين'
          data={this.getNumbersTo60()}
          itemTextStyle={{ textAlign: 'right' }}
        />
        </View>
      </Card>
      </View>
      </View>
      );
  }
  // <RadioForm
  //   buttonSize={15}
  //   radio_props={radioProps}
  //   initial={0}
  //   formHorizontal
  //   labelHorizontal={false}
  //   buttonColor={'#2196f3'}
  //   animation
  //   onPress={(type) => this.setState({ type })}
  // />

}

export default AddEvent;
