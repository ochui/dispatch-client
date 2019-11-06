/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Text,
  Animated,
  Easing,
  Dimensions,
  View
} from 'react-native';
import { connect } from 'react-redux';

import UserInput from '../components/UserInput';
import Logo from '../components/Logo';
import usernameImg from '../assets/images/username.png';
import passwordImg from '../assets/images/password.png';
import eyeImg from '../assets/images/eye_black.png';
import Wallpaper from '../components/Wallpaper';
import SignupSection from '../components/SignupSection';

import spinner from '../assets/images/loading.gif';
import { colors, fonts } from '../constants';

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      isLoading: false
    };
    this.showPass = this.showPass.bind(this);
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  showPass() {
    const { press } = this.state;
    if (press === false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  }

  _onPress() {
    const { isLoading } = this.state;
    if (isLoading) return;

    this.setState({ isLoading: true });
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }).start();

    setTimeout(() => {
      console.log('grow done');
      // this._onGrow();
    }, 2000);

    setTimeout(() => {
      this.setState({ isLoading: false });
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }).start();
  }

  render() {
    const { showPass, isLoading } = this.state;
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN]
    });

    return (
      <Wallpaper>
        <Logo />
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

        <SignupSection props={this.props} />
        <View style={styles.btncontainer}>
          <Animated.View style={{ width: changeWidth }}>
            <TouchableOpacity
              style={styles.button}
              onPress={this._onPress}
              activeOpacity={1}
            >
              {isLoading ? (
                <Image source={spinner} style={styles.image} />
              ) : (
                <Text style={styles.text}>LOGIN</Text>
              )}
            </TouchableOpacity>
            <Animated.View
              style={[styles.circle, { transform: [{ scale: changeScale }] }]}
            />
          </Animated.View>
        </View>
      </Wallpaper>
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
  },
  btncontainer: {
    flex: 1,
    top: -95,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: colors.black
  },
  text: {
    color: colors.white,
    backgroundColor: 'transparent',
    fontFamily: fonts.uberBold
  },
  image: {
    width: 24,
    height: 24
  }
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    isLoading: state.auth.isLoading
  };
};
// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = () => {
  // Action
  return {};
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
