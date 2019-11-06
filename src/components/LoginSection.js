import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import TouchText from './TouchText';

const LoginSection = p => {
  const { props } = p;
  return (
    <View style={styles.container}>
      <TouchText
        onPress={() => {
          props.navigation.navigate('Login');
        }}
        style={styles.help}
        text="Login"
        styleText={styles.text}
      />
      <TouchText
        onPress={() => {
          props.navigation.navigate('Reset');
        }}
        style={styles.help}
        text="Forgot Password?"
        styleText={styles.text}
      />
    </View>
  );
};

export default LoginSection;

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 65,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent'
  }
});
