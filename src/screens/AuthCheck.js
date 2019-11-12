import React from 'react';
import { View } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { gStyle } from '../constants';
import { loadUserProfile } from '../redux/action/authAction';

class AuthCheck extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrap = this.bootstrap.bind(this);
    // if (navigation.getParam('action', 'CHECK') === 'LOGOUT') {
    //   // this.props.clearToken();
    //   // this.props.navigation.dismiss();

    //   navigation.navigate('Auth');
    // } else {
    //   this.bootstrap();
    // }
    this.bootstrap();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrap() {
    const { authToken, navigation, getUserProfile } = this.props;

    if (authToken !== undefined && authToken !== null) {
      axios.defaults.headers.common.Authorization = `Token ${authToken}`;
      getUserProfile();
      navigation.navigate('App');
    } else {
      navigation.navigate('Auth');
    }
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={gStyle.container}>
        <DotIndicator color="black" />
      </View>
    );
  }
}

AuthCheck.propTypes = {
  navigation: propTypes.object.isRequired,
  authToken: propTypes.string.isRequired,
  getUserProfile: propTypes.func.isRequired
};

propTypes.defaults = {
  authToken: 'undefined'
};

const mapActionsToProps = dispatch => {
  return {
    getUserProfile: () => {
      dispatch(loadUserProfile);
    }
  };
};
const mapStateToProps = state => {
  return {
    authToken: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AuthCheck);
