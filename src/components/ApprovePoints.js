import React, { Component } from 'react';
import { Text, View,  Image, ScrollView  } from 'react-native';
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
              description: 'رحنا ولعبنا واستانسنا وانبسرحنا ولعبنا واستانسنا وانبسطنرحنا ولعبنا و يلسطنوانبسطنطنا',
              leader: 'ناصر العواجي',
            },
            {
                name: 'استضافه المدرج ',
                description: 'جبنا ياسر العصيفير',
                leader: 'ناصر العواجي',
            },
            {
                name: 'اfff ',
                description: 'جبنا ياسر العصيفير',
                leader: 'ناصر العواجي',
            },
            {
                name: 'ffdfdf المدرج ',
                description: 'جبنا ياسر العصيفير',
                leader: 'ناصر العواجي',
            },
           ]
      });
    }

  render() {
    return (
      <ScrollView >
          {
    this.state.events.map((item, i) => (

       <View style={{ marginBottom: i==this.state.events.length-1? 20:0 }} key={i} >
        <Card   title={item.name} key={i}>
        
        <Text style={{marginBottom: 25, textAlign: 'center'}}>
        {item.description}
        </Text>
        <Text style={{marginBottom: 10,textAlign: 'center'}}>
        قائد المشروع: {item.leader} 
        </Text>
        <Button 
        backgroundColor='#03A9F4'
         buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
         title='ارصدني'
         rightIcon={{name: 'work'}}
         />

        </Card>
        </View>
    ))
  }
      </ScrollView>
      );
  }

}

export default ApprovePoints;

