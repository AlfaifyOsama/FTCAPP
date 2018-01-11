import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ text, onPress }) => (
    <TouchableOpacity style={styles.btnStyle} onPress={onPress}>
      <Text style={styles.btnTextStyle}>{text}</Text>
    </TouchableOpacity>
);

const styles = {
  btnTextStyle: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnStyle: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 5,
    backgroundColor: '#4286f4',
    borderRadius: 25,
    height: 40,
    justifyContent: 'center'
  }
};

export { Button };
