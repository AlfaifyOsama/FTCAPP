import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Spinner = ({ size }) => (
  <View style={styles.spinnerStyle}>
    <ActivityIndicator size={size || 'large'} />
  </View>
);

const styles = {
  spinnerStyle: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export { Spinner };
