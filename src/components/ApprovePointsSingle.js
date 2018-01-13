import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'

class ApprovePointsSingle extends Component {
    state = { events: [] } ;

    componentDidMount() {
    }

  render() {
    return (
      <ScrollView>
        <Card title="CARD WITH DIVIDER">
          {
            users.map((u, i) => {
              return (
                <View key={i} >
                  <Image
                    resizeMode="cover"
                    source={{ uri: u.avatar }}
                  />
                  <Text>{u.name}</Text>
                </View>
              );
            })
          }
        </Card>
      </ScrollView>
      );
  }
}
const users = [
 {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 },
];

export default ApprovePointsSingle;
