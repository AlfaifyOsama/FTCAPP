import React, { Component } from 'react';
import { Card, Icon } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { Spinner } from '../common';
import BaseURL from '../../config';
import mainColor from './constants';
import Separator from './Separator';
import Tel from './Tel';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  eventsText: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 10,
    marginTop: 10
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  socialIcon: {
    marginLeft: 7,
    marginRight: 7,
  },
  socialRow: {
    marginTop: 10,
    flexDirection: 'row',
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    marginRight: '7%',
    marginLeft: '7%',
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: mainColor,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
});

class UserProfile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 0,
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
      }
    };
  }
  state = {
    userEvents: [],
    loading: true,
    showAlert: false,
    telDS: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(this.props.navigation.state.params.tels),
    emailDS: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(this.props.navigation.state.params.emails)
  }

  getInfo = async () => {
    const token = 'Bearer ' + await AsyncStorage.getItem('token');
    const userID = this.props.navigation.state.params.userID;
    const instance = axios.create({
      timeout: 3000,
      headers: { 'Authorization': token }
    });
    instance.get(BaseURL + '/users/' + userID + '/getEvents')
      .then((response) => {
        this.setState({
          userEvents: response.data,
          loading: false
        });
      })
      .catch((error) => {
        //console.log(error.response);
        this.setState({ loading: false });
        alert('التطبيق ما اتصل بالسيرفر، شيك على الانترنت عندك');
      });
  }
  componentDidMount() {
    this.getInfo();
  }



  onPressTel = number => {
    return this.checkAccountExists(number) ? Linking.openURL(`tel:${number}`).catch(err => alert('Error', number)) : this.showAlert();
  }

  onSnapChatPress = () => {
    const snapchat = this.props.navigation.state.params.socialAccounts.snapchat;
    const snapchatURL = 'https://www.snapchat.com/add/' + snapchat;
    return this.checkAccountExists(snapchat) ? Linking.openURL(snapchatURL).catch(err => alert('Error:', snapchatURL)) : this.showAlert();
  }
 
  onTwitterPress = () => {
    const twitter = this.props.navigation.state.params.socialAccounts.twitter;
    const twitterURL = 'https://twitter.com/' + twitter;
    return this.checkAccountExists(twitter) ? Linking.openURL(twitterURL).catch(err => alert('Error:', twitterURL)) : this.showAlert();
  }

  onLinkedInPress = () => {
    // if not URL
    const linkedin = this.props.navigation.state.params.socialAccounts.linkedin;
    const linkedinURL = 'https://www.linkedin.com/in/' + linkedin;
    return this.checkAccountExists(linkedin) ? Linking.openURL(linkedinURL).catch(err => alert('Error:', linkedinURL)) : this.showAlert();
  }
  
  onSteamPress = () => {
    const steam = this.props.navigation.state.params.socialAccounts.steam;
    const steamURL = 'http://steamcommunity.com/search/users/#text=' + steam;
    return this.checkAccountExists(steam) ? Linking.openURL(steamURL).catch(err => alert('Error:', steamURL)) : this.showAlert();
  }

  checkAccountExists = (account) => {
    if (account === undefined || account === null || account === ''){
      return false;
    }
    return true;
  }
  // https://api.whatsapp.com/send?phone=966568020407
  chatInWhatsApp = () => {
    const phoneNumber = this.props.navigation.state.params.tels[0].number;
    const whatsappURL = 'https://api.whatsapp.com/send?phone=' + phoneNumber;
    return this.checkAccountExists(phoneNumber) ? Linking.openURL(whatsappURL).catch(alert('Error:', phoneNumber)) : this.showAlert();
  }


  renderSocialIcons = () => {
    return (
    <View style={styles.socialRow}>
          <View>
          <Icon
              size={30}
              type="font-awesome"
              color="#fffc04"
              name="snapchat"
              onPress={() => this.onSnapChatPress()}
              underlayColor="#fffc04"
          />
          </View>
          <View style={styles.socialIcon}>
            <Icon
              size={30}
              type="entypo"
              color="#56ACEE"
              name="twitter-with-circle"
              onPress={() => this.onTwitterPress()}
              underlayColor="#56ACEE"
            />
          </View>
          <View style={{ marginRight: 7 }}>
          <Icon
              size={30}
              type="entypo"
              color="#027ab5"
              name="linkedin-with-circle"
              onPress={() => this.onLinkedInPress()}
              underlayColor="#027ab5"
          />
          </View>
          <View>
          <Icon
              size={30}
              type="font-awesome"
              color="#231f20"
              name="steam"
              onPress={() => this.onSteamPress()}
              underlayColor="#231f20"
          />
          </View>
        </View>
    );
  }

  renderHeader = () => {
    const {
      avatar,
      name,
      bio
    } = this.props.navigation.state.params;

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={require('../images/mountain_background.png')}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
                uri: avatar,
              }}
            />
            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {bio}
                </Text>
              </View>
            </View>
              {this.renderSocialIcons()}
          </View>
        </ImageBackground>
      </View>
    );
  }

  renderUserEvents = () => {
    if (this.state.userEvents === undefined || this.state.userEvents.length === 0) {
      return (<Text style={{ margin: 10 }}>ماسجل بفعاليات للآن :( </Text>);
    }
    return this.state.userEvents.map((event, index) =>
      <View key={'MainView' + index} style={{ width: '100%', alignItems: 'center' }}>
          <Text style={styles.eventNameStyle} >{event.name}</Text>
        <View key={index} style={index == this.state.userEvents.length - 1 ? { marginBottom: 10 } : styles.line} />
      </View>
    );
  }

  renderTel = () => (
    <ListView
      contentContainerStyle={styles.telContainer}
      dataSource={this.state.telDS}
      renderRow={({ id, name, number }, _, k) => {
        return (
          <Tel
            key={`tel-${id}`}
            index={k}
            name={name}
            number={number}
            onPressSms={this.chatInWhatsApp}
            onPressTel={this.onPressTel}
          />
        );
      }}
    />
  );

  hideAlert = () => {
    this.setState({
      showAlert: false
        });
  }

  showAlert = () => {
    this.setState({
      showAlert: true
        });
  }
  
  renderAwesomeAlert = () => {
    return (
      <AwesomeAlert
            show={this.state.showAlert}
            title="بروبلم"
            message="خويك ما حط حساب"
            closeOnTouchOutside
            closeOnHardwareBackPress
            showConfirmButton
            confirmButtonColor="red"
            confirmText="طيب"
            onConfirmPressed={() => {
            this.hideAlert();
      }}
    />
    );
  }

  render() {
    if (this.state.loading){
      return (<Spinner />);
      }
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
            {this.renderTel()}
            {Separator()}

            {/* <Card containerStyle={styles.cardContainer}>
            <Text style={styles.eventsText}>الفعاليات اللي مسجل فيها:</Text>
            {this.renderUserEvents()}
            </Card> */}

            
          </Card>
        </View>
       {this.renderAwesomeAlert()}
      </ScrollView>
    );
  }
}

export default UserProfile;
