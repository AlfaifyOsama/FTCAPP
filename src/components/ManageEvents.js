import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card, Button } from 'react-native-elements';

class ManageEvents extends Component {
  state = { events: [] } ;

  componentDidMount() {
    this.setState({
      events: [
        {
          name: 'بينت بول',
          description: 'واستانسنا وانبسرحنا ولعبنا واستانسنا وانبسطنرحنا ولعبنا و يلسطنوانبسطنطنا',
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
    <ScrollView>
      {
        this.state.events.map((item, i) => (
        <View
          style={[{ paddingBottom: i === this.state.events.length - 1 ? 20 : 0 }, styles.pageStyle]}
          key={i}
        >
          <Card title={item.name} key={i}>
            <Text style={{ marginBottom: 25, textAlign: 'center' }}>
            {item.description}
            </Text>
            <Text style={{ marginBottom: 10, textAlign: 'center' }}>
            قائد المشروع: {item.leader}
            </Text>
            <Button
              backgroundColor='#03A9F4'
              buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='ادارة المشروع'
              rightIcon={{ name: 'account-settings-variant', type: 'material-community' }}
              onPress={() => this.props.navigation.navigate('ManageEventsSingle')}
            />
          </Card>
        </View>
    ))
      }
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
};

export default ManageEvents;
