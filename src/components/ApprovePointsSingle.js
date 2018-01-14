import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';

class ApprovePointsSingle extends Component {
    state = { members: [], inputs: [] };

    componentDidMount() {
      this.setState({
        members: [
          {
            name: 'اسامه المتوحش',
            work: ['work1work1work1work1work1work1work1work1work1work1work1', 'work2', 'work3']
          },
          {
            name: 'نواف الشرير',
            work: ['worknnnn', 'worknnnn', 'worknnnn']
          },
          {
            name: 'اسامه الفيفي الزبال',
            work: ['workooooo', 'workoooo2', 'workoooo3']
          },
          {
            name: ' ناصر مقر',
            work: ['ناصر', 'ناصر', 'ناصر']
          },
          {
            name: 'يوسفxx999',
            work: ['yosif', 'yosif', 'yosif']
          },
         ]
    });
    }

  renderCards() {
    const { singleWorkStyle, workTextStyle, line } = styles;
    return this.state.members.map((item, index) => (
      <View style={[{ marginBottom: index === this.state.members.length - 1 ? 20 : 0 }, styles.pageStyle]} key={index} >
        <Card title={item.name} key={index}>
          {
            item.work.map((work, indexWork) => {
              return (
                <View style={singleWorkStyle} key={indexWork}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <TextInput
                      placeholder={'00'}
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      onChangeText={id => this.setState({ id })}
                      value={this.state.id}
                      style={{ textAlign: 'right' }}
                    />
                    <Text style={workTextStyle}>{work}</Text>
                  </View>
                  <View style={line} />
                </View>
              );
            })
          }
          <Button
            title='ارصدها'
            rightIcon={{ name: 'done' }}
            backgroundColor='#9ccc65'
            style={{ alignSelf: 'center' }}
            rounded
          />
        </Card>
      </View>
    ));
  }

  render() {
    return (
      <ScrollView>
        { this.renderCards() }
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
  singleWorkStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20
  },
  workTextStyle: {
    fontSize: 14,
    textAlign: 'right',
    marginLeft: 40,
    marginRight: 15,
    color: '#515151'
  },
  line: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    borderTopWidth: 1,
    borderColor: '#e5e5e5'
  },
};


export default ApprovePointsSingle;
