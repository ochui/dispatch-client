import React, { Component } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image
} from 'react-native';

import UserInput from './UserInput';
// import ButtonSubmit from './ButtonSubmit';
// import SignupSection from './SignupSection';

import usernameImg from '../assets/images/username.png';
import passwordImg from '../assets/images/password.png';
import eyeImg from '../assets/images/eye_black.png';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false
    };
    this.showPass = this.showPass.bind(this);
  }

  showPass() {
    const { press } = this.state;
    if (press === false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  }

  render() {
    const { showPass } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInput
          source={usernameImg}
          placeholder="Username"
          autoCapitalize="none"
          returnKeyType="done"
          autoCorrect={false}
          secureTextEntry={false}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={showPass}
          placeholder="Password"
          returnKeyType="done"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}
        >
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  btnEye: {
    position: 'absolute',
    top: 63,
    right: 28
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)'
  }
});
