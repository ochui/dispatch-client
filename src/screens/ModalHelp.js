import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Alert } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';
import {
  connect as wsConnect,
  disconnect as wsDisconnect,
  send as wsSend
} from '@giantmachines/redux-websocket';
import ModalHeader from '../components/ModalHeader';
import { gStyle, socketUrl } from '../constants';
import helpRequest from '../redux/action/helpAction';

class ModalHelp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { openSocket, requestCop, lat, lng } = this.props;
    if (lat === null || lng === null) {
      Alert.alert('Error', 'We need your location');
      return;
    }
    openSocket(socketUrl);
    requestCop(lat, lng);
  }

  componentDidUpdate() {
    const { requestHelp, token, cops, isOpen, navigation } = this.props;
    if (!isOpen) {
      navigation.goBack(null);
      navigation.navigate('ModalQRCode');
    }
    requestHelp(token, cops);
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={gStyle.container}>
        <ModalHeader navigation={navigation} text="Please wait.." />
        <View style={gStyle.p24}>
          <Text>Hang on, we are contacting security personnel near you</Text>
        </View>
        <DotIndicator color="black" />
      </View>
    );
  }
}

ModalHelp.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
  openSocket: PropTypes.func.isRequired,
  requestHelp: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  cops: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  requestCop: PropTypes.func.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    cops: state.help.cops.features,
    searching: state.help.searching,
    token: state.auth.token,
    isOpen: state.help.isOpen,
    lat: state.location.lat,
    lng: state.location.lng
  };
};
// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    openSocket: wsUrl => {
      dispatch(wsConnect(wsUrl));
    },
    closeSocket: () => {
      dispatch(wsDisconnect());
    },
    requestHelp: (_token, _cops = []) => {
      dispatch(
        wsSend({
          token: _token,
          command: 'request_for_help',
          cops: _cops
        })
      );
    },
    requestCop: (lat, lng) => {
      dispatch(helpRequest(lat, lng));
    }
  };
};
// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalHelp);
