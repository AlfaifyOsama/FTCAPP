import React, { Component } from 'react';
import {
  Text, TouchableOpacity, AsyncStorage, View,
  ScrollView, KeyboardAvoidingView, Platform, Keyboard
} from 'react-native';
import { Card, Button, Icon, CheckBox } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import AwesomeAlert from 'react-native-awesome-alerts';
import RadioForm,
{ RadioButton, RadioButtonInput, RadioButtonLabel }
  from 'react-native-simple-radio-button';
import DateTimePicker from 'react-native-modal-datetime-picker';
import axios from 'axios';
import BaseURL from '../config';
import { Spinner } from './common';

class AddEvent extends Component {
  state = {
    members: [],
    selected: [],
    query: '',
    projectName: '',
    projectDisc: '',
    type: 'ATTEND',
    date: '',
    maxNumOfMembers: 0,
    loading: false,
    selectedIDs: [],
    isDateTimePickerVisible: false,
    whatsapp_link: '',
    notifyUsers: false,
    showAlert: false,
    alertMsg: '',
    alertTitle: ''
  }

  componentDidMount() {
    this.getInfo();
  }

  onNamePress = async (data) => {
    const userID = await AsyncStorage.getItem('userID');
    const { maxNumOfMembers, selected, selectedIDs } = this.state;

    if (selected.includes(data.props.children)) {
      alert('سبق واضفت هذا الشخص تستهبل انت');
    } else if (selected.length >= maxNumOfMembers) {
      alert('اما انك ما حددت الحد الاعلى للمشاركين او ان المشروع وصل للحد الاعلى للمشاركين');
    } else if (data.key === userID) {
      alert('لاتضيف نفسك يالطقطوقي');
    } else {
      selected.push(data.props.children);
      selectedIDs.push(data.key);
      this.setState({ query: '' });
    }
  }

  onSubmit = async () => {
    if (!this.validateWhatsappLink(this.state.whatsapp_link)) {
      this.setState({ alertMsg: 'رابط الواتساب غير صالح', showAlert: true });
      return;
    }
    const {
      projectName,
      projectDisc,
      maxNumOfMembers,
      type,
      selectedIDs,
      date,
      whatsapp_link,
      notifyUsers
    } = this.state;

    this.setState({ loading: true });
    const token = 'Bearer' + await AsyncStorage.getItem('token');
    const instance = axios.create({
      timeout: 3000,
      headers: { 'Authorization': token }
    });
    const param = {
      name: projectName,
      description: projectDisc,
      type,
      user_limit: maxNumOfMembers,
      users: selectedIDs,
      date,
      whatsapp_link,
      notifyUsers,
    };
    instance.post(BaseURL + '/events/create', param)
      .then((response) => {
        this.setState({ loading: false, alertTitle: 'تمت اضافة المشروع', alertMsg: 'الله الله بالشغل السنع :)', showAlert: true });
        Keyboard.dismiss();
      })
      .catch((error) => {
        this.setState({ loading: false });
        //console.log(error);
        alert('حصلت مشكلة، تأكد انك دخلت البيانات كاملة وجرب مرة ثانية');
      });
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

  validateWhatsappLink(link) {
    if (link === '' || link === undefined) {
      return true;
    }
    const re = /^https?\:\/\/(www\.)?chat(\.)?whatsapp(\.com)?\/.*(\?v=|\/v\/)?[a-zA-Z0-9_\-]+$/;
    const isValid = re.test(link);
    return isValid;
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
    if (this.state.selected.length > 0)
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

  renderButtonOrSpinner() {
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

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    this.setState({ date: `${day} / ${month + 1} / ${year}` });
    this.hideDateTimePicker();
  }

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
    this.props.navigation.state.params.onGoBack();
    this.props.navigation.goBack();
  };

  render() {
    const radioProps = [
      { label: 'نحتاج منظمين', value: 'ORGANIZE', index: 0 },
      { label: 'التسجيل للحضور فقط', value: 'ATTEND', index: 1 }
    ];
    const { query } = this.state;
    const names = this.renderNames(query);
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} keyboardVerticalOffset={70}>
        <ScrollView keyboardShouldPersistTaps='always' style={{ backgroundColor: '#ECF2F4' }}>
          <View style={{ paddingBottom: 15 }}>
            <Card>
              <TextField
                label='اسم المشروع'
                value={this.state.projectName}
                onChangeText={(projectName) => this.setState({ projectName })}
                inputContainerStyle={{ alignItems: 'flex-end' }}
                style={{ textAlign: 'right' }}
              />

              <TextField
                label='وصف المشروع (متعدد الاسطر)'
                value={this.state.projectDisc}
                onChangeText={(projectDisc) => this.setState({ projectDisc })}
                inputContainerStyle={{ alignItems: 'flex-end' }}
                title='لا تسلك، الوصف: وصفك الشي‌ء بحليته (يَصِفُ) وَصْفًا ، ووُصوفًا'
                titleTextStyle={{ textAlign: 'right' }}
                multiline
                style={{ textAlign: 'right' }}
              />

              <TouchableOpacity onPress={this.showDateTimePicker}>
                <View pointerEvents='none'>
                  <TextField
                    label='تاريخ المشروع'
                    value={this.state.date}
                    inputContainerStyle={{ alignItems: 'flex-end' }}
                    style={{ textAlign: 'right' }}
                  />
                </View>
              </TouchableOpacity>

              <TextField
                label='رابط قروب الواتساب'
                title='تأكد من صحة الرابط عشان ما تصير مشاكل.'
                titleTextStyle={{ textAlign: 'right' }}
                multiline
                value={this.state.whatsapp_link}
                onChangeText={(text) => this.setState({ whatsapp_link: text })}
                inputContainerStyle={{ alignItems: 'flex-end' }}
                style={{ textAlign: 'right' }}
              />


              <View style={{ width: '60%', alignSelf: 'flex-end' }}>
                <Dropdown
                  label='الحد الاعلى للمشاركين'
                  data={this.getNumbersTo60()}
                  itemTextStyle={{ textAlign: 'right' }}
                  onChangeText={(value) => this.setState({ maxNumOfMembers: value })}
                />
                <Text style={{ textAlign: 'right', opacity: 0.6 }}>لا تحسب نفسك.</Text>
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
                autoCorrect={false}
                placeholder={'اكتب هنا المشاركين مبدئياً'}
                data={names}
                defaultValue={query}
                onChangeText={text => this.setState({ query: text })}
                renderItem={data => (
                  <TouchableOpacity onPress={this.onNamePress.bind(this, data)}>
                    <Text style={{ textAlign: 'right', marginTop: 10, paddingTop: 5, paddingBottom: 5, paddingRight: 10 }}>{data}</Text>
                  </TouchableOpacity>
                )}
                inputContainerStyle={{ borderRadius: 10, alignItems: Platform.OS === 'ios' ? 'flex-end' : 'stretch', paddingRight: 10 }}

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
                          buttonStyle={{}}
                          buttonWrapStyle={{ marginLeft: 10 }}
                        />
                      </RadioButton>);
                  })}

                </RadioForm>
              </View>

              <View style={{ backgroundColor: 'transparent', alignItems: 'center' }}>
                <CheckBox
                  title='تبي ترسل تنبيه لكل الأعضاء؟'
                  checked={this.state.notifyUsers}
                  containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent', }}
                  iconRight
                  onPress={() => {
                    if (this.state.notifyUsers)
                      this.setState({ notifyUsers: false });
                    else
                      this.setState({ notifyUsers: true });
                  }}
                />
              </View>

              <View>
                {this.renderButtonOrSpinner()}
              </View>

              <View style={{ flex: 1 }}>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={(date) => this.handleDatePicked(date)}
                  onCancel={this.hideDateTimePicker}
                />
              </View>
            </Card>
          </View>
        </ScrollView>
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title={this.state.alertTitle}
          message={this.state.alertMsg}
          closeOnTouchOutside
          closeOnHardwareBackPress
          showCancelButton={false}
          showConfirmButton
          confirmText="طيب"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}

export default AddEvent;
