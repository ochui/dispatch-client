import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import TouchText from './TouchText';

const SignupSection = p => {
  const { props } = p;
  return (
    <View style={styles.container}>
      <TouchText
        onPress={() => {
          props.navigation.navigate('Register');
        }}
        style={styles.help}
        text="Create Account"
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

export default SignupSection;

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
