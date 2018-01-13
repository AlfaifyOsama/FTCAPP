import React, { Component } from 'react';
import { Text, View,  Image  } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';

class ApprovePoints extends Component {
  render() {
    return (
      <View>
        <Card
title='HELLO WORLD'
>
<Text style={{marginBottom: 10}}>
 The idea with React Native Elements is more about component structure than actual design.
</Text>
<Button
 
 backgroundColor='#03A9F4'

 buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
 title='ارصدني'
 rightIcon={{name: 'work'}} />
</Card>
      </View>
      );
  }

}

export default ApprovePoints;
   

const users = [
 {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 },
];

