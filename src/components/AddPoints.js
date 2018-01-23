import React, { Component } from 'react';
import { Text, View, TextInput, AsyncStorage, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Card, Button, Divider } from 'react-native-elements';
import axios from 'axios';
import BaseURL from '../config';

class AddPoints extends Component {


  state = { userId: '', value: '', members: [], selected: [], query: '', selectedIDs: [], showLoading: false };

  componentDidMount() {
    this.getInfo();
  }

  onPress = async () => {
    const value = this.state.value;
    if (value === undefined || value === '' || isNaN(value)) {
      alert(' عندك مشكلة ياريس، تأكد انك كتبت شي وان الارقام انكليزية');
      return;
    }
    if(value < 0){
      alert('انتبه تراك حطيت رقم سالب ونقصت الرجال');
    }
    if(this.state.selected.length == 0){
      alert('اختار احد اول يالطقطوقي');
      return;
    }
    alert(this.state.selectedIDs[0]);
    this.setState({showLoading: true});

    const token = await AsyncStorage.getItem('token');
    const instance = axios.create({
      timeout: 5000,
      headers: { 'Authorization': 'Bearer '+  token }
      });
      instance.put(BaseURL + '/points/addPoints', {
        value: this.state.value,
        user_id: this.state.selectedIDs[0]
      })
        .then((response) => {
          //console.log(response.data.users);
          if (response.status == 200) {
            this.setState({ showLoading: false });
          }
        })
        .catch((error) => {
          console.log(error);
          alert('فيه مشكلة، حاول مرة ثانية');
          this.setState({ showLoading: true });
        });
  }



  onNamePress = (data) => {
    if (this.state.selected.length == 1) {
      alert('سبق واضفت واحد تستهبل انت');
    } else {
      this.state.selected.push(data.props.children);
      this.state.selectedIDs.push(data.key);
    }
    this.setState({ query: '' });
  }

  getInfo = async () => {
    //console.log('getInfo');

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
  validate = (index,lengthOfRecodedWork) => {
    for(i=0 ; i< lengthOfRecodedWork; i++){
      const value = this.state.inputs[index+''+i];
      if(value < 0 ){
        alert('انتبه تراك حطيت رقم سالب متأكد تبي تنقص الرجال؟');
      }
      if(value === undefined || value === '' || isNaN(value)){
        return false;
      }
    }
      return true;
  }

  renderSelectedNames = () => {
    console.log('renderSelectedNames');

    if (this.state.selected.length > 0)
      return this.state.selected.map((member, i) => (
        i === 0 ? <Text style={{ color: '#515151' }} key={i}> {member} </Text> : <Text style={{ color: '#515151' }} key={i}> {member}،</Text>
      ));
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

  render() {
    const { query } = this.state;
    const names = this.renderNames(query);
    return (

      <View style={styles.pageStyle} >
        <Card title='ارصد النقاط ولاتعلم احد' >
          <Text style={{ textAlign: 'center', fontSize: 20 }} >لمين تبي ترصد؟</Text>
          <View style={{ marginBottom: 15, marginTop: 15 }} />
          <Autocomplete
            placeholder={'لمين تبي ترصد؟ً'}
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
          <View style={{ marginBottom: 15, marginTop: 15 }} />
          <Text style={{ textAlign: 'center', fontSize: 20 }} >كم؟</Text>
          <View style={{ marginBottom: 15, marginTop: 5 }} />            
          <TextInput
            placeholder={'00'}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={{ textAlign: 'center' }}
            onChangeText={(text) => this.setState({ value: text })}
            value={this.state.value}
            maxLength={2}
          />
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 20 }}
            title='ارصد'
            rightIcon={{ name: 'send' }}
            onPress={() => this.onPress()}
          />

        </Card>
        <AwesomeAlert
      show={this.state.showLoading}
      showProgress={true}
      title="لودنق.."
      message="اصبر"
      closeOnTouchOutside={true}
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
  inputStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 0.5,
    borderColor: '#03A9F4',
    height: 100,
  }
};


export default AddPoints;
