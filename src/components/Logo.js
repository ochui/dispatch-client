import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import logoImg from '../assets/images/logo.png';

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.image} />
      <Text style={styles.text}>Dispatch</Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 80,
    height: 80
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20
  }
});
