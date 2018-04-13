import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Card, Button, FormLabel, FormInput, Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import BaseURL from '../config';

class MyProfile extends Component {


    state = {
        pass1: '',
        pass2: '',
        bio: '',
        'quote': '',
        showLoadingAlert: false,
        showErrorAlert: false,
        snapchat: '',
        twitter: '',
        linkedin: '',
        steam: ''
    };
    componentDidMount() {
        this.getInfo();
    }

    onPress = async (ButtonClicked) => {
        let params = {};
        if (ButtonClicked === 'PASSWORD') { //Password Button was clicked, validate passwords
            const value1 = this.state.pass1;
            const value2 = this.state.pass2;
            if (value1 !== value2 || value1.length < 6 || value1 === undefined || value1 === '') {
                this.showErrorAlert();
                return;
            }
            params = {
                password: value1
            };
        } else if (ButtonClicked === 'BIO') { //BIO Button was clicked, validate BIO
            const bio = this.state.bio;
            if (bio.length > 50 || bio === undefined || bio === '' || bio === ' ') {
                this.showErrorAlert();
                return;
            }
            params = {
                bio
            };
        } else if (ButtonClicked === 'Social') { // Social button was clicked, validate Social
            //validate here
            params = {
               snapchat: this.state.snapchat,
               twitter: this.state.twitter,
               linkedin: this.state.linkedin,
               steam: this.state.steam
            };
        }
        this.showLoadingAlert();

        const token = await AsyncStorage.getItem('token');
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

    updateQuote = async () => {
        const quote = this.state.quote;
        if (quote.length > 150 || quote === undefined || quote === '' || quote === ' ') {
            this.showErrorAlert();
            return;
        }
        params = {
            quote
        };

        const token = await AsyncStorage.getItem('token');
        const instance = axios.create({
            timeout: 5000,
            headers: { 'Authorization': 'Bearer ' + token }
        });
        instance.post(BaseURL + '/users/updateQuote', params)
        .then((response) => {
            //console.log(response.data.users);
            if (response.status  >= 200 && response.status < 400) {
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

    getInfo = async () => {
        const token = 'Bearer ' + await AsyncStorage.getItem('token');
        const userID = await AsyncStorage.getItem('userID');
        const instance = axios.create({
            timeout: 3000,
            headers: { 'Authorization': token }
        });
        instance.get(BaseURL + '/users/' + userID)
            .then((response) => {
                this.setState({
                    bio: response.data.bio,
                    snapchat: response.data.snapchat,
                    twitter: response.data.twitter,
                    linkedin: response.data.linkedin,
                    steam: response.data.steam,
                    loading: false 
                });
            })
            .catch((error) => {
                //console.log(error.response);
                this.setState({ loading: false });
                alert('التطبيق ما اتصل بالسيرفر، شيك على الانترنت عندك');
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
    renderBio = () => {
        return (
            <Card title='فلسفتك في الحياة' containerStyle={{ borderRadius: 10 }}>
                <FormLabel containerStyle={styles.inputLabelStyle} >تفلسف</FormLabel>
                <FormInput
                 inputStyle={styles.inputStyle}
                 onChangeText={(text) => this.setState({ bio: text })}
                 value={this.state.bio} 
                 multiline
                />
                <Button
                    backgroundColor='#03A9F4'
                    buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 20 }}
                    title='اعتمد'
                    rightIcon={{ name: 'check-circle' }}
                    onPress={() => this.onPress('BIO')}
                />
            </Card>
        );
    }

    renderQuoteSubmission = () => {
        return (
            <Card title='اكتب في "كلام مايهمك"' containerStyle={{ borderRadius: 10 }}>
                <FormLabel containerStyle={styles.inputLabelStyle} >وش رايك</FormLabel>
                <FormInput
                 inputStyle={styles.inputStyle}
                 onChangeText={(text) => this.setState({ quote: text })}
                 value={this.state.quote} 
                 multiline
                />
                <Button
                    backgroundColor='#03A9F4'
                    buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 20 }}
                    title='اعتمد'
                    rightIcon={{ name: 'check-circle' }}
                    onPress={() => this.updateQuote()}
                />
            </Card>
        );
    }
    renderSocialAccounts = () => {

        return (
            <Card title='حساباتك' containerStyle={{ borderRadius: 10 }}>
            <Text style={{ fontSize: 13.8, fontWeight: 'bold', textAlign: 'center', color: '#86939e' }}>دخل اسم اليوزر لاتدخل روابط</Text>
                <FormLabel>Snapchat</FormLabel>
                <FormInput
                 onChangeText={(text) => this.setState({ snapchat: text })}
                 value={this.state.snapchat}
                 autoCapitalize='none'
                />

                <FormLabel>Twitter</FormLabel>
                <FormInput
                 onChangeText={(text) => this.setState({ twitter: text })}
                value={this.state.twitter}
                autoCapitalize='none'
                />

                <FormLabel>LinkedIn</FormLabel>
                <FormInput
                 onChangeText={(text) => this.setState({ linkedin: text })}
                 value={this.state.linkedin}
                 autoCapitalize='none'
                />

                <FormLabel>Steam</FormLabel>
                <FormInput
                 onChangeText={(text) => this.setState({ steam: text })}
                 value={this.state.steam}
                 autoCapitalize='none'
                />

                <Button
                    backgroundColor='#03A9F4'
                    buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 20 }}
                    title='اعتمد'
                    rightIcon={{ name: 'check-circle' }}
                    onPress={() => this.onPress('Social')}
                />
            </Card>
        );
    }

    renderPassword = () => {
        return (
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
        );
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ECF2F4' }}>

                <KeyboardAwareScrollView keyboardShouldPersistTaps='always' extraScrollHeight={60}>
                    {this.renderPassword()}
                    {this.renderBio()}
                    {this.renderSocialAccounts()}
                    {this.renderQuoteSubmission()}
                </KeyboardAwareScrollView>

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
                    message="عندك مشكلة يافندم، اذا عبيت حقل الباسوورد تأكد انهم نفس الشي وانهم يتجاوزون 6 احرف او ارقام، واذا عبيت حقل البايو تأكد انه مايتجاوز 50 حرف. الصراحه كان يمديني احط تنبيه مختلف لكل واحد بس متعيجز"
                    closeOnHardwareBackPress={false}
                    showCancelButton
                    cancelText={'طيب'}
                    cancelButtonColor={'red'}
                    onCancelPressed={() => this.hideErrorAlert()}
                />
            </View>
        );
    }
}

const styles = {
    inputLabelStyle: {
        alignItems: 'flex-end',
    },
    inputStyle: {
        width: '100%'
    }
};


export default MyProfile;
