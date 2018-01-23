import React, { Component } from 'react';
import { Text, TouchableOpacity, AsyncStorage, View, Picker, ScrollView } from 'react-native';
import { Card, Button, Icon, Divider } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import normalize from 'react-native-elements/src/helpers/normalizeText';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import BaseURL from '../config';

class ManageEventsSingle extends Component {
  state = {
    members: [],
    selected: [],
    query: '',
    projectName: '',
    projectDisc: '',
    type: 'ATTEND',
    date: '',
    maxNumOfMembers: 0,
    selectedIDs: [],
    eventId: this.props.navigation.state.params.eventId,
    newAddedMembersIDs: [],
    newAddedMembers: [],
    deletedMembersIDs: [],
    isDateTimePickerVisible: false,
    whatsapp: '',
  }

  componentDidMount() {
    this.getProjectInfo();
    this.getAllMembers();
  }

  onNamePress = (data) => {
    const { selectedIDs, newAddedMembersIDs, maxNumOfMembers } = this.state;
    const addedMembersNumber = selectedIDs.length + newAddedMembersIDs.length;

    // data.key is the user id
    if (selectedIDs.includes(parseInt(data.key)) || newAddedMembersIDs.includes(data.key + '')) {
      alert('العضو مضاف بالمشروع من قبل!');
      return;
    } else if (addedMembersNumber >= maxNumOfMembers) {
      alert('عدد الاعضاء في المشروع وصل للحد الأعلى');
      return;
    }
    this.state.newAddedMembers.push(data.props.children);
    this.state.newAddedMembersIDs.push(data.key);
    this.setState({ query: '' });
  }

  onSaveChangesPress = async () => {
    const token = 'Bearer ' + await AsyncStorage.getItem('token');
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': token }
    });

    const { newAddedMembersIDs, projectName, projectDisc, maxNumOfMembers,
      eventId, deletedMembersIDs, date, whatsapp
      } = this.state;

    const updatedInfo = {
      users: newAddedMembersIDs,
      name: projectName,
      description: projectDisc,
      user_limit: maxNumOfMembers,
      event_id: eventId,
      deletedMembersIDs,
      date,
      whatsapp,
    };

    instance.put(`${BaseURL}/events/updateEvent`, updatedInfo)
      .then((response) => {
        this.refs.toast.show('حفظنا لك التغييرات', 500);
      })
      .catch((error) => {
      });
  }


  getAllMembers = async () => {
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

  getProjectInfo = async () => {
    const token = 'Bearer ' + await AsyncStorage.getItem('token');

    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': token }
    });
    instance.get(`${BaseURL}/events/${this.state.eventId}/show`)
      .then((response) => {
        const { name, description, user_limit, type } = response.data.event;
        const { IDs, names } = response.data.users;

        // Add all project registered info
        this.setState({
          projectName: name,
          projectDisc: description,
          maxNumOfMembers: user_limit,
          type,
          selected: names,
          selectedIDs: IDs
        });
      })
      .catch((error) => {
        alert('ERROR');
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
    if (this.state.newAddedMembers.length > 0)
      return this.state.newAddedMembers.map((member, i) => (
        i === 0 ? <Text style={{ color: '#515151' }} key={i}> {member} </Text> : <Text style={{ color: '#515151' }} key={i}> {member}،</Text>
      ));
  }

  renderAllRegisteredMembers() {
    return (
      this.state.selected.map((member, index) =>
      <View key={'Main' + member.id}>
        <View key={'Sub' + member.id} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
          <View key={'Sub2' + member.id} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text key={'Text'+member.id} style={{ opacity: 0.7 }}>طيّره</Text>
              <Icon
                key={'Icon' + member.id}
                size={10}
                reverse
                name='cross'
                type='entypo'
                color='red'
                onPress={() => (this.removeMember(index, member))}
              />
            </View>
            <View key={' View' + member.id} style={{ justifyContent: 'center', flex: 1, alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 16, opacity: 0.7 }}>{member}</Text>
            </View>
          </View>
          <Divider style={{ marginBottom: 5, marginTop: 5 }} />
        </View>
      )
    );
  }

  removeMember(memberIndex, member) {
    this.state.deletedMembersIDs.push(this.state.selectedIDs[memberIndex]);
    this.state.selected.splice(memberIndex, 1);
    this.state.selectedIDs.splice(memberIndex, 1);
    this.setState({});
    // just to re-render
  }

  onCancel() {
    this.props.navigation.goBack();
  }

  getNumbersTo60() {
    const numbers = [];
    for (let i = 1; i <= 60; i++) {
      numbers.push({ value: i });
    }
    return numbers;
  }

  showDeleteAlert = () => {
    this.setState({ showDeleteAlert: true });
  }

  hideDeleteAlert = () => {
    this.setState({ showDeleteAlert: false });
  }

  deleteEvent = async () => {
    const token = 'Bearer ' + await AsyncStorage.getItem('token');
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': token }
    });

    const updatedInfo = {
      event_id: this.state.eventId,
      status: 'DONE',
    };

    instance.put(`${BaseURL}/events/updateEvent`, updatedInfo)
      .then((response) => {
        this.hideDeleteAlert();
        this.props.navigation.navigate('ManageEvents');
      })
      .catch((error) => {
      });
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


  render() {
    const radioProps = [
      { label: 'نحتاج منظمين', value: 'ORGANIZE', index: 0 },
      { label: 'التسجيل للحضور فقط', value: 'ATTEND', index: 1 }
    ];
    const { query } = this.state;
    const names = this.renderNames(query);
    return (
      <View>
      <ScrollView>
        <View style={{ paddingBottom: 15 }}>
          <Card title='المشروع'>
            <TextField
              label='اسم المشروع'
              value={this.state.projectName}
              onChangeText={(projectName) => this.setState({ projectName })}
              inputContainerStyle={{ alignItems: 'flex-end' }}
              style={{ textAlign: 'right' }}
            />

            <TextField
              label='وصف المشروع'
              value={this.state.projectDisc}
              onChangeText={(projectDisc) => this.setState({ projectDisc })}
              inputContainerStyle={{ alignItems: 'flex-end' }}
              title='لا تسلك، الوصف: وصفك الشي‌ء بحليته (يَصِفُ) وَصْفًا ، ووُصوفًا'
              titleTextStyle={{ textAlign: 'right' }}
              style={{ textAlign: 'right' }}
              multiline
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
              value={this.state.whatsapp}
              onChangeText={(whatsapp) => this.setState({ whatsapp })}
              inputContainerStyle={{ alignItems: 'flex-end' }}
            />

            <View style={{ width: '60%', alignSelf: 'flex-end' }}>
              <Dropdown
                label='الحد الاعلى للمشاركين'
                data={this.getNumbersTo60()}
                itemTextStyle={{ textAlign: 'right' }}
                onChangeText={(value) => this.setState({ maxNumOfMembers: value })}
                value={this.state.maxNumOfMembers}
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
                  onPress={() => this.setState({ newAddedMembers: [], newAddedMembersIDs: [] })}
                />
              </View>
              <Text style={{ textAlign: 'right', flex: 1 }}>اضافة مشاركين:</Text>
            </View>
            <Autocomplete
              placeholder={'اضافة مشاركين'}
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
                        buttonStyle={{}}
                        buttonWrapStyle={{ marginLeft: 10 }}
                      />
                    </RadioButton>);
                })}

              </RadioForm>
            </View>
            <Text style={{ fontSize: normalize(14), fontWeight: 'bold', marginBottom: 15, color: '#43484d', textAlign: 'center', marginTop: 50 }}>الاعضاء</Text>
            <Divider style={{ marginBottom: 15 }} />
            { this.renderAllRegisteredMembers() }
            <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button
                backgroundColor='#03A9F4'
                buttonStyle={{ borderRadius: 20, marginTop: 25 }}
                title='الغاء ورجوع'
                rightIcon={{ name: 'cross', type: 'entypo' }}
                onPress={this.onCancel.bind(this)}
              />
              <Button
                backgroundColor='#9ccc65'
                buttonStyle={{ borderRadius: 20, marginTop: 25 }}
                title='حفظ التغييرات'
                rightIcon={{ name: 'done' }}
                onPress={this.onSaveChangesPress.bind(this)}
              />
            </View>
            <View>
              <Button
                backgroundColor='red'
                buttonStyle={{ borderRadius: 20, marginTop: 5 }}
                title='إنهاء المشروع'
                rightIcon={{ name: 'calendar-check', type: 'material-community' }}
                onPress={() => this.showDeleteAlert()}
              />
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
        show={this.state.showDeleteAlert}
        title="أكيد ودك تنهي الفعالية؟"
        message='تأكد أنك رصدت النقاط لجميع المشاركين!'
        closeOnHardwareBackPress={false}
        showCancelButton
        showConfirmButton
        cancelText={'بغيت أجيب العيد'}
        confirmButtonColor={'red'}
        onCancelPressed={() => this.hideDeleteAlert()}
        confirmText={'أكيد'}
        onConfirmPressed={() => this.deleteEvent()}
      />
      </View>
    );
  }

}

const styles = {
  line: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    borderTopWidth: 1,
    borderColor: '#e5e5e5'
  },
};

export default ManageEventsSingle;
