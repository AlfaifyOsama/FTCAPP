import React, { Component } from 'react';
import { Text, View, ImageBackground, AsyncStorage } from 'react-native';
import axios from 'axios';
import BaseURL from '../config';
import { Spinner } from './common';

class Home extends Component {
  state = { loading: true,
            points: null,
            rank: null,
            status: '',
            qotd: '',
            avg: null,
            firstName: '',
            lastName: '',
          }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
   const token = 'Bearer ' + await AsyncStorage.getItem('token');
   const id = await AsyncStorage.getItem('userID');
   const firstName = await AsyncStorage.getItem('firstName');
   const lastName = await AsyncStorage.getItem('lastName');

   const instance = axios.create({
   timeout: 5000,
   headers: { 'Authorization':  token }
   });
   instance.get(BaseURL + '/users/' + id + '/points')
     .then((response) => {
       console.log(response.data);


       this.setState({
         points: response.data.points,
         rank: response.data.rank,
         status: response.data.status,
         avg: response.data.avgOfPoints,
         qotd: response.data.QuoteOfTheDay,
         firstName,
         lastName,
       });
     })
     .catch((error) => {
       console.log(error);
       alert('Error');
     });
     this.setState({ loading: false });
  }

  renderSpinner() {
    return <Spinner />;
  }

  render() {
    if (this.state.loading) {
      return this.renderSpinner();
    }

    const { pageStyle, sectionStyle, headerImage, nameStyle, cardContentStyle,
            statusStyle, cardStyle, shadowStyle, cardBackgroundStyle,
            cardTitleStyle, qotdCardStyle, qotdContentStyle,
            statusBarBackground
          } = styles;
    return (
      <View style={pageStyle}>
        <View>
          <ImageBackground style={headerImage} source={require('./images/headerImage.jpg')}>
            <View style={statusBarBackground} />
            <Text style={nameStyle}>{this.state.firstName} {this.state.lastName}</Text>
            <Text style={statusStyle}>{this.state.status}</Text>
          </ImageBackground>
          <View style={[sectionStyle, { marginTop: 150 }]}>
            <View style={[cardStyle, shadowStyle]}>
              <ImageBackground style={[cardStyle, cardBackgroundStyle]} source={require('./images/rank.png')}>
              <Text style={cardContentStyle}>{this.state.rank}</Text>
              <Text style={cardTitleStyle}>ترتيبك</Text>
              </ImageBackground>
            </View>

            <View style={[cardStyle, shadowStyle]}>
              <ImageBackground style={[cardStyle, cardBackgroundStyle]} source={require('./images/pts.png')}>
              <Text style={cardContentStyle}>{this.state.points}</Text>
              <Text style={cardTitleStyle}>نقاطك</Text>
              </ImageBackground>
            </View>
          </View>

          <View style={[sectionStyle, { marginTop: 10 }]}>
            <View style={[qotdCardStyle, shadowStyle]}>
              <Text style={qotdContentStyle}>{this.state.qotd}</Text>
            </View>
          </View>

        </View>
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
  containerStyle: {
    marginTop: 40,
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 30,
    marginLeft: 30
  },
  headerImage: {
    flex: 1,
    height: 200,
  },
  nameStyle: {
    fontSize: 30,
    color: '#fff',
    alignSelf: 'center',
    marginTop: 55
  },
  statusStyle: {
    alignSelf: 'center',
    color: '#e5e5e5',
    fontSize: 14
  },
  cardStyle: {
    width: 150,
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  cardBackgroundStyle: {
    width: '65%',
    height: '65%',
  },
  cardContentStyle: {
    fontSize: 35,
    color: '#0684B7',
    fontWeight: 'bold'
  },
  cardTitleStyle: {
    fontSize: 14,
    color: '#515151'
  },
  qotdCardStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  qotdContentStyle: {
    fontSize: 15,
    color: '#515151',
    padding: 5,
    textAlign: 'center'
  },
  statusBarBackground: {
    width: '100%',
    height: 21,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    opacity: 0.3
  }
};

export default Home;
