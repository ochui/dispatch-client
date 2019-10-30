import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, device, fonts, gStyle } from '../constants';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={gStyle.container}>
        <Text>Register Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Register;
