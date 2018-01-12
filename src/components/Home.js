import React, { Component } from 'react';
import { Text, View, ImageBackground, AsyncStorage } from 'react-native';
import axios from 'axios';
import BaseURL from '../config';
import { Spinner } from './common';

class Home extends Component {
  state = { loading: true ,
            points: null,
            rank: null,
            status: '',
            qotd: '',
            avg: null
          }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
   const token = 'Bearer' + await AsyncStorage.getItem('token');
   const id = await AsyncStorage.getItem('userID');
   const name = await AsyncStorage.getItem('firstName');

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
         qotd: response.data.QuoteOfTheDay
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

    const { pageStyle, sectionStyle, contentStyle, headingsStyle, containerStyle } = styles;
    return (
      <View style={pageStyle}>
        <ImageBackground style={{ width: '100%', height: '100%' }} source={{ uri: 'https://i.pinimg.com/originals/13/87/a3/1387a36df4c1beb28437f177760dca03.jpg' }}>
        <View style={containerStyle}>
        <View style={sectionStyle}>
          <View style={contentStyle}>
            <Text style={headingsStyle}>ترتيبك</Text>
          </View>

          <View style={contentStyle}>
            <Text style={headingsStyle}>نقاطك</Text>
          </View>
        </View>

        <View style={sectionStyle}>
          <View style={contentStyle}>
            <Text style={headingsStyle}>{this.state.rank}</Text>
          </View>

          <View style={contentStyle}>
            <Text style={headingsStyle}>{this.state.points}</Text>
          </View>
        </View>

        <View style={sectionStyle}>
          <Text style={[headingsStyle, { marginTop: 20 }]}> انت {this.state.status}</Text>
        </View>

        <View style={sectionStyle}>
          <Text style={[headingsStyle, { marginTop: 100 }]}>{this.state.qotd}</Text>
        </View>
        </View>
        </ImageBackground>
      </View>
      );
  }
}
const styles = {
  pageStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  containerStyle: {
    marginTop: 40,
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5
  },
  contentStyle: {
    width: '25%',
    alignItems: 'center',
  },
  headingsStyle: {
    fontSize: 20,
    color: '#fff'
  },
  marginTop: {
    marginTop: 20
  },
};

export default Home;
