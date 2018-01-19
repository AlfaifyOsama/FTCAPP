import React, { Component } from 'react';
import { Text, TouchableOpacity, ScrollView, View, AsyncStorage, WebView, Linking, refreshControl, RefreshControl } from 'react-native';
import { List, ListItem, getIconType } from 'react-native-elements';
import BaseURL from '../config';
import axios from 'axios';


export default class UsersList extends Component {


    state = {
        data: [],
        refreshing: false,
    };

    componentDidMount() {
        this.getInfo();
    }

    getInfo = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log('token: ', token);
        const instance = axios.create({
            timeout: 5000,
            headers: { 'Authorization': 'Bearer ' + token }
        });
        instance.get(BaseURL + '/users/getAll')
            .then((response) => {
                console.log(response.data);
                if (response.status == 200) {
                    this.setState({ data: response.data });
                }

            })
            .catch((error) => {
                console.log(error.response);
                alert('فيه مشكلة، حاول مرة ثانية');
            });
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.getInfo();
        this.setState({ refreshing: false });
    }

    getIconDir() {
        return require('./images/whatsapp.png');
    }

    // https://api.whatsapp.com/send?phone=966568020407
    chatInWhatsApp(user) {
        const phoneNumber = 'https://api.whatsapp.com/send?phone=' + user.phone;
        return (Linking.openURL(phoneNumber));
    }

    render() {
        return (
            <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                />
            }
            >
            <List
                containerStyle={{ marginBottom: 20, marginTop: 0 }}
            >
                {
                    this.state.data.map((user, i) => (
                        <ListItem
                            roundAvatar
                            avatar={this.getIconDir(user)}
                            key={i}
                            title={user.first_name + ' ' + user.last_name}
                            subtitle={user.bio}
                            subtitleContainerStyle={{ alignItems: 'flex-end' }}
                            onPress={() =>
                                this.chatInWhatsApp(user)
                            }
                        />
                    ))
                }
            </List>
                </ScrollView>
        );
    }
}

// <ScrollView
//                 style={{ flex: 1 }}

//             >

//                 <List containerStyle={{ marginBottom: 20, marginTop: 0 }}>
//                     {

//                         this.state.data.map((user, index) => {
//                             alert(user.first_name);
//                             <ListItem
//                                 key={index}
//                                 title={user.first_name + ' ' + user.last_name}
//                                 subtitle={user.bio}
//                                 subtitleContainerStyle={{ alignItems: 'flex-end' }}
//                                 roundAvatar
//                                 avatar={this.getIconDir()}
//                                 onPress={() =>
//                                     this.chatInWhatsApp(user)
//                                 }
//                             />
//                         }
//                         )
//                     }
//                 </List>
//             </ScrollView >