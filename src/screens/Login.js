import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { colors, device, fonts, gStyle } from '../constants';
import Form from '../components/Form';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={gStyle.container}>
        <View style={styles.AuthContainer}>
          <Text>Hello world</Text>
          <Form />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AuthContainer: {
    height: device.height,
    position: 'absolute',
    width: device.width,
    alignSelf: 'center'
  }
});

export default Login;
