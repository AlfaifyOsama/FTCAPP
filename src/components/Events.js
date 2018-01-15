import React, { Component } from 'react';
import { Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Events extends Component {
  static navigationOptions = ({ navigation }) => {
    return { headerRight:
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ManageEvents')}
                      style={{ marginRight: 20 }}
                    >
                        <Ionicons
                          name={'ios-settings'}
                          size={26}
                          style={{ color: '#000' }}
                        />
                     </TouchableOpacity>,

              headerLeft:
                      <TouchableOpacity
                        onPress={() => navigation.navigate('AddEvent')}
                        style={{ marginLeft: 20 }}
                      >
                          <Ionicons
                            name={'md-add'}
                            size={26}
                            style={{ color: '#000' }}
                          />
                       </TouchableOpacity>
            };
  }

  state = { events: [] } ;

  componentDidMount() {
    this.setState({
      events: [
        {
          name: 'بينت بول',
          description: 'واستانسنا وانبسرحنا ولعبنا واستانسنا وانبسطنرحنا ولعبنا و يلسطنوانبسطنطنا',
          leader: 'ناصر العواجي',
          type: 'ORGANIZE'
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
            type: 'ORGANIZE'
        },
        {
            name: 'ffdfdf المدرج ',
            description: 'جبنا ياسر العصيفير',
            leader: 'ناصر العواجي',
        },
       ]
  });
}

renderAppropriateButton(type) {
  if (type === 'ORGANIZE') {
    return (
      <Button
        backgroundColor='#03A9F4'
        buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title='شارك في التنظيم'
        rightIcon={{ name: 'handshake-o', type: 'font-awesome' }}
        onPress={() => this.props.navigation.navigate('ApprovePointsSingle')}
      />
    );
  }

  return (
    <Button
      backgroundColor='#9ccc65'
      buttonStyle={{ borderRadius: 20, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
      title='شارك في الفعالية'
      rightIcon={{ name: 'smile-o', type: 'font-awesome' }}
      onPress={() => this.props.navigation.navigate('ApprovePointsSingle')}
    />
  );
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
            {this.renderAppropriateButton(item.type)}
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

export default Events;
