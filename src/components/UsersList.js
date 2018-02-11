import React, { Component } from 'react';
import { ScrollView, AsyncStorage, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import axios from 'axios';
import BaseURL from '../config';
import { Spinner } from './common';


export default class UsersList extends Component {


    state = {
        data: [],
        refreshing: false,
        loading: true
    };

    componentDidMount() {
        this.getInfo();
    }

    getInfo = async () => {
        const token = await AsyncStorage.getItem('token');
       // console.log('token: ', token);
       this.setState({ loading: true });
        const instance = axios.create({
            timeout: 5000,
            headers: { 'Authorization': 'Bearer ' + token }
        });
        instance.get(BaseURL + '/users/getAll')
            .then((response) => {
             //   console.log(response.data);
                if (response.status == 200) {
                    this.setState({ data: response.data });
                    this.setState({ loading: false });

                }

            })
            .catch((error) => {
            //    console.log(error.response);
                alert('فيه مشكلة، حاول مرة ثانية');
                this.setState({ loading: false });
            });
    }

    getIcon(image) {
        return image;
    }

    goToDetailedView = (user) => {        
        const name = user.first_name + ' ' + user.last_name;
        const avatar = BaseURL + '/users/getUserImage/' + user.id;
        const tels = [{ id: 1, name: 'Mobile', number: user.phone }];
        const emails = { id: 1, email: user.student_id + '@student.ksu.edu.da' };

        this.props.navigation.navigate('ProfileScreen', {
            name,
            bio: user.bio,
            avatar,
            tels,
            emails,
            userID: user.id
        });
     }
    _onRefresh() {
        this.setState({ refreshing: true });
        this.getInfo();
        this.setState({ refreshing: false });
    }

    render() {
        if (this.state.loading){
            return (<Spinner />);
            }
        return (
            <ScrollView
            style={{ flex: 1, backgroundColor: '#ECF2F4' }}
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
                            avatar={this.getIcon(user.profilephoto)}
                            key={i}
                            title={user.first_name + ' ' + user.last_name}
                            subtitle={user.bio}
                            subtitleNumberOfLines={2}
                            subtitleContainerStyle={{ alignItems: 'flex-end' }}
                            onPress={() =>
                                this.goToDetailedView(user)
                            }
                        />
                    ))
                }
            </List>
                </ScrollView>
        );
    }
}
