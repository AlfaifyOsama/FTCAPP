import React, { Component } from 'react';
import { Text, View,  Image  } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';

class ApprovePoints extends Component {

    state = { events: [] } ;

    constructor(props) {
      super(props);
    }
  
      componentDidMount() {
        this.setState({
          events: [
            {
              name: 'بينت بول',
              description: 'رحنا ولعبنا واستانسنا وانبسطنا',
              leader: 'ناصر العواجي',
            },
            {
                name: 'استضافه المدرج ',
                description: 'جبنا ياسر العصيفير',
                leader: 'ناصر العواجي',
            }
           ]
      });
    }


  render() {
    return (
      <View>
          {
    this.state.events.map((item, i) => (

        <Card title={item.name} key={i}>
        
        <Text style={{marginBottom: 10}}>
        {item.description}
        </Text>
        <Text style={{marginBottom: 10}}>
        {item.leader}
        </Text>
        <Button 
        backgroundColor='#03A9F4'
         buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
         title='ارصدني'
         rightIcon={{name: 'work'}}
          />

        </Card>
    ))
  }
        


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

