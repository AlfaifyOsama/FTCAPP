import React, { Component } from 'react';
import { View, AsyncStorage, ScrollView } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import BaseURL from '../config';

class MyProfile extends Component {


    state = { pass1: '', pass2: '', bio: '', showLoadingAlert: false, showErrorAlert: false };

    onPress = async (ButtonClicked) => {
        
        let params = {};
        if (ButtonClicked === 'PASSWORD') { //Password Button was clicked, validate passwords
            const value1 = this.state.pass1;
            const value2 = this.state.pass2;
            if (value1 !== value2 || value1.length < 6 || value1 == undefined || value1 == '') {
                this.showErrorAlert();
                return;
            }
            params = {
                password: value1
            };
        } else if (ButtonClicked === 'BIO') { //BIO Button was clicked, validate BIO
            const bio = this.state.bio;
            if (bio.length > 30 || bio == undefined || bio === '' || bio === ' ') {
                this.showErrorAlert();
                return;
              }
              params = {
                bio
            };
            }
        this.showLoadingAlert();

        const token = await AsyncStorage.getItem('token');
        const id = await AsyncStorage.getItem('userID');
        const instance = axios.create({
            timeout: 5000,
            headers: { 'Authorization': 'Bearer ' + token }
        });
        instance.put(BaseURL + '/users/update', params)
            .then((response) => {
                //console.log(response.data.users);
                if (response.status === 200) {
                    this.hideLoadingAlert();
                    this.props.navigation.goBack(null);
                }
            })
            .catch((error) => {
              //  console.log(error);
                this.showErrorAlert();
                this.setState({ pass1: '', pass2: '' });
            });

    }



    showLoadingAlert = () => {
        this.setState({
            showLoadingAlert: true
        });
    }

    hideLoadingAlert = () => {
        this.setState({
            showLoadingAlert: false
        });
    }
    showErrorAlert = () => {
        this.setState({
            showErrorAlert: true
        });
    }
    hideErrorAlert = () => {
        this.setState({
            showErrorAlert: false
        });
    }


    render() {
        return (
            <ScrollView>
            <View style={styles.pageStyle} >

                <Card title='تغيير كلمة السر' containerStyle={{ borderRadius: 10 }}>
                    <FormLabel containerStyle={styles.inputLabelStyle} >الرقم السري الجديد</FormLabel>
                    <FormInput secureTextEntry inputStyle={styles.inputStyle} onChangeText={(text) => this.setState({ pass1: text })} />
                    <FormLabel containerStyle={styles.inputLabelStyle} >تأكيد الرقم السري الجديد</FormLabel>
                    <FormInput secureTextEntry inputStyle={styles.inputStyle} onChangeText={(text) => this.setState({ pass2: text })} />
                    <Button
                        backgroundColor='#03A9F4'
                        buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 20 }}
                        title='اعتمد'
                        rightIcon={{ name: 'check-circle' }}
                        onPress={() => this.onPress('PASSWORD')}
                    />
                </Card>

                <Card title='فلسفتك في الحياة' containerStyle={{ borderRadius: 10, marginBottom: 15 }}>
                    <FormLabel containerStyle={styles.inputLabelStyle} >تفلسف</FormLabel>
                    <FormInput inputStyle={styles.inputStyle} onChangeText={(text) => this.setState({ bio: text })} />
                    <Button
                        backgroundColor='#03A9F4'
                        buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 20 }}
                        title='اعتمد'
                        rightIcon={{ name: 'check-circle' }}
                        onPress={() => this.onPress('BIO')}
                    />
                </Card>
            </View>
            <AwesomeAlert
                    show={this.state.showLoadingAlert}
                    showProgress
                    title="Loading"
                    message="لحظات ..."
                    closeOnTouchOutside
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={false}
                />
            <AwesomeAlert
                    show={this.state.showErrorAlert}
                    title="بروبلم"
                    message="عندك مشكلة يافندم، اذا عبيت حقل الباسوورد تأكد انهم نفس الشي وانهم يتجاوزون 6 احرف او ارقام، واذا عبيت حقل البايو تأكد انه مايتجاوز 30 حرف. الصراحه كان يمديني احط تنبيه مختلف لكل واحد بس متعيجز"
                    closeOnHardwareBackPress={false}
                    showCancelButton
                    cancelText={'طيب'}
                    cancelButtonColor={'red'}
                    onCancelPressed={() => this.hideErrorAlert()}
                />
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
    inputLabelStyle: {
        // shadowRadius: 2,
        // borderColor: '#03A9F4',
          alignItems: 'flex-end'
    },
    inputStyle: {
        width: '100%'
    }
};


export default MyProfile;
