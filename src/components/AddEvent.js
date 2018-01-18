import React, { Component } from 'react';
import { Text, TouchableOpacity, AsyncStorage, View, Picker, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import axios from 'axios';
import BaseURL from '../config';
import { Spinner } from './common';

class AddEvent extends Component {
  state = { members: [],
            selected: [],
            query: '',
            projectName: '',
            projectDisc: '',
            type: 'ATTEND',
            maxNumOfMembers: 0,
            loading: false,
            selectedIDs: []
          }

  componentDidMount() {
    this.getInfo();
  }

  onNamePress = (data) => {
    console.log('onNamePress');
    console.log(data);
    const { maxNumOfMembers, selected, selectedIDs } = this.state;
    if (selected.includes(data.props.children)) {
      alert('سبق واضفت هذا الشخص تستهبل انت');
    } else if (selected.length >= maxNumOfMembers) {
      alert('اما انك ما حددت الحد الاعلى للمشاركين او ان المشروع وصل للحد الاعلى للمشاركين')
    } else {
      selected.push(data.props.children);
      selectedIDs.push(data.key);
    }
    this.setState({ query: '' });
  }

  onSubmit = async () => {
    console.log('a');

    console.log('a');
    const {
      projectName,
      projectDisc,
      maxNumOfMembers,
      type,
      selectedIDs
    } = this.state;

    this.setState({ loading: true });
    const token = 'Bearer ' + await AsyncStorage.getItem('token');
    const instance = axios.create({
    timeout: 3000,
    headers: { 'Authorization':  token }
    });

    const param = {
      name: projectName,
      description: projectDisc,
      type,
      user_limit: maxNumOfMembers,
      users: selectedIDs,
    }
    instance.post(BaseURL + '/events/create', param)
      .then((response) => {
        this.setState({ loading: false });
        alert('تمت اضافة المشروع بنجاح');
        this.props.navigation.navigate('Events');
      })
      .catch((error) => {
        this.setState({ loading: false });
        alert('حصلت مشكلة، تأكد انك دخلت البيانات كاملة وجرب مرة ثانية');
      });
  }


  getInfo = async () => {
    console.log('getInfo');

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
    console.log('renderNames');

    if (query === '') {
      return [];
    }

    const { members } = this.state;
    const tmp = members.filter((member) => (member.first_name + ' ' + member.last_name).includes(query));
    return tmp.map((member, i) =>
      <Text key={member.id} style={{ textAlign: 'right' }}>{member.first_name + ' ' + member.last_name}</Text>);
  }

  renderSelectedNames = () => {
    console.log('renderSelectedNames');

    if(this.state.selected.length > 0)
      return this.state.selected.map((member, i) => (
        i === 0 ? <Text style={{ color: '#515151' }} key={i}> {member} </Text> : <Text style={{ color: '#515151' }} key={i}> {member}،</Text>
      ));
  }

  getNumbersTo60() {
    console.log('getNumbersTo60');

    const numbers = [];
    for (let i = 1; i <= 60; i++) {
      numbers.push({ value: i });
    }
    return numbers;
  }

  renderButtonOrSpinner() {
    console.log('renderButtonOrSpinner');

    if (this.state.loading) {
      return <Spinner size={'small'} />;
    }
    return (<Button
      backgroundColor='#03A9F4'
      buttonStyle={{ borderRadius: 20, marginTop: 25 }}
      title='اضف المشروع'
      rightIcon={{ name: 'library-add' }}
      onPress={() => this.onSubmit()}
    />);
  }

  render() {
    console.log('render');
    
    console.log(this.state);
    const radioProps = [
      { label: 'نحتاج منظمين', value: 'ORGANIZE', index: 0 },
      { label: 'التسجيل للحضور فقط', value: 'ATTEND', index: 1 }
    ];
    const { query } = this.state;
    const names = this.renderNames(query);
    return (
      <ScrollView style={{ backgroundColor: '#ECF2F4' }}>
      <View style={{ paddingBottom: 15 }}>
      <Card>
        <TextField
          label='اسم المشروع'
          value={this.state.projectName}
          onChangeText={(projectName) => this.setState({ projectName })}
          inputContainerStyle={{ alignItems: 'flex-end' }}
        />

        <TextField
          label='وصف المشروع (متعدد الاسطر)'
          value={this.state.projectDisc}
          onChangeText={(projectDisc) => this.setState({ projectDisc })}
          inputContainerStyle={{ alignItems: 'flex-end' }}
          title='لا تسلك، الوصف: وصفك الشي‌ء بحليته (يَصِفُ) وَصْفًا ، ووُصوفًا'
          titleTextStyle={{ textAlign: 'right' }}
          multiline
        />
        <View style={{ width: '60%', alignSelf: 'flex-end' }}>
        <Dropdown
          label='الحد الاعلى للمشاركين'
          data={this.getNumbersTo60()}
          itemTextStyle={{ textAlign: 'right' }}
          onChangeText={(value) => this.setState({ maxNumOfMembers: value })}
        />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ opacity: 0.7 }}>حذف الكل</Text>
              <Icon
                size={10}
                reverse
                name='cross'
                type='entypo'
                color='red'
                onPress={() => this.setState({ selected: [] })}
              />
          </View>
          <Text style={{ textAlign: 'right', flex: 1 }}>المشاركين مبدئيا:</Text>
        </View>
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
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5, flexWrap: 'wrap' }}>
          {
              this.renderSelectedNames()
          }
        </View>
        <View style={{ alignItems: 'center', marginTop: 30, marginRight: 20 }}>
        <RadioForm
          formHorizontal
          animation
        >
          {radioProps.map((obj, i) => {
            return (
              <RadioButton labelHorizontal key={i} style={{ marginLeft: 15 }}>
              <RadioButtonLabel
                obj={obj}
                index={i}
                onPress={() => this.setState({ type: obj.value })}
                labelHorizontal
                labelStyle={{ fontSize: 15, color: '#000' }}
                labelWrapStyle={{}}
              />
              <RadioButtonInput
                obj={obj}
                index={i}
                onPress={() => this.setState({ type: obj.value })}
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
        <View>
          {this.renderButtonOrSpinner()}
        </View>
      </Card>
      </View>
      </ScrollView>
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