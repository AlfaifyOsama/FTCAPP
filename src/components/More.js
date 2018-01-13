import React, { Component } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { List, ListItem } from 'react-native-elements';


export default class Home extends Component {
  state = { options: [] } ;

  constructor(props) {
    super(props);

  }

    componentDidMount() {
      this.setState({
        options: [
          {
            title: 'رصد النقاط',
            icon: 'work'
          },
          {
            title: 'ارسال التنبيهات',
            icon: 'send',
          }
         ]
    });
  }
  onPress = (x) => {
    if(x == 0)
      this.props.navigation.navigate('ApprovePoints');
    else if(x == 1)
      this.props.navigation.navigate('SendNotifications');

  }
  render() {

    const { pageStyle, listStyle, listItem } = styles;
    return (
       <View style={pageStyle}>
      <List style={listStyle}>
  {
    this.state.options.map((item, i) => (
      <ListItem   
        onPress={() => this.onPress(i)}
        style={listItem}
        key={i}
        title={item.title}
        leftIcon={{name: item.icon}}
      />
    ))
  }
</List>
      </View>
      );
  }
}

const styles = {
  pageStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ECF2F4',
    marginBottom: 20,
 
  },
  listStyle: {
    justifyContent: 'space-between',
    height: 100,
  },
  listItem: {

  }

};
