/* eslint-disable camelcase */
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
  View,
  Alert
} from 'react-native';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import UserInput from '../components/UserInput';
import Logo from '../components/Logo';
import Wallpaper from '../components/Wallpaper';
import LoginSection from '../components/LoginSection';
import { colors, fonts } from '../constants';
import {
  registrationRequest,
  clearAuthError
} from '../redux/action/authAction';
import usernameImg from '../assets/images/username.png';
import passwordImg from '../assets/images/password.png';
import eyeImg from '../assets/images/eye_black.png';
import spinner from '../assets/images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false
    };
    this.showPass = this.showPass.bind(this);
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  componentDidUpdate() {
    const { isLoading, error, clearError } = this.props;
    if (!isLoading && error !== null) {
      Alert.alert('Validation error', error.error);
      clearError();
    }
  }

  showPass() {
    const { press } = this.state;
    if (press === false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  }

  _onPress(values, isLoading) {
    // const { isLoading } = this.state;
    const { registrationRequestAction } = this.props;
    if (isLoading) return;
    registrationRequestAction(values.username, values.password);
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }).start();
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }).start();
  }

  render() {
    const { showPass } = this.state;
    const { handleSubmit, isLoading, logging_in, navigation } = this.props;
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN]
    });

    if (!isLoading && logging_in) {
      this._onGrow();
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
      setTimeout(() => {
        navigation.navigate('App');
      }, 500);
    } else {
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }

    return (
      <Wallpaper>
        <Logo />
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          {/* <UserInput
            source={usernameImg}
            placeholder="Username"
            autoCapitalize="none"
            returnKeyType="done"
            autoCorrect={false}
            secureTextEntry={false}
          /> */}
          <Field
            name="username"
            component={UserInput}
            source={usernameImg}
            placeholder="Username"
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {/* <UserInput
            source={passwordImg}
            secureTextEntry={showPass}
            placeholder="Password"
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
          /> */}
          <Field
            name="password"
            component={UserInput}
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

        <LoginSection props={this.props} />
        <View style={styles.btncontainer}>
          <Animated.View style={{ width: changeWidth }}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(values => {
                this._onPress(values, isLoading);
              })}
              activeOpacity={1}
            >
              {isLoading ? (
                <Image source={spinner} style={styles.image} />
              ) : (
                <Text style={styles.text}>REGISTER</Text>
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

Register.propTypes = {
  registrationRequestAction: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  isLoading: propTypes.bool.isRequired,
  navigation: propTypes.object.isRequired,
  logging_in: propTypes.bool.isRequired,
  error: propTypes.object.isRequired,
  clearError: propTypes.func.isRequired
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    isLoading: state.auth.isLoading,
    logging_in: state.auth.logging_in,
    error: state.auth.error
  };
};
// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    registrationRequestAction: (username, password) => {
      dispatch(registrationRequest(username, password));
    },
    clearError: () => {
      dispatch(clearAuthError());
    }
  };
};

export default reduxForm({
  form: 'register'
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Register)
);
