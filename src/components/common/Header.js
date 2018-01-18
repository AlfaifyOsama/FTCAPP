import React from 'react';
import { Text, View } from 'react-native';

const Header = (text) => {
  const { textStyle, viewStyle } = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{text.headerText}</Text>
    </View>
  );
};

const styles = {
  textStyle: {
    fontSize: 20,
    color: '#fff',
  },
  viewStyle: {
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  }
};

export { Header };
