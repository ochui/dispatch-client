import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { colors, device, fonts, gStyle } from '../constants';

// components
import RequestHelp from '../components/RequestHelp';
import TouchIcon from '../components/TouchIcon';
import TouchText from '../components/TouchText';
import CopMarkerList from '../components/CopMarkerList';

// icons
// import SvgCheckShield from '../components/icons/Svg.CheckShield';
import SvgMenu from '../components/icons/Svg.Menu';
// import SvgQRCode from '../components/icons/Svg.QRCode';

import helpRequest from '../redux/action/helpAction';

const { PROVIDER_GOOGLE } = MapView;
const cops = [
  { lat: 4.824167, lng: 7.033611, name: 'Test cop 1' },
  { lat: 5.0387213, lng: 7.9246855, name: 'Test cop 2' },
  { lat: 5.0, lng: 8.516667, name: 'Test cop 3' },
  { lat: 5.985531, lng: 7.617144, name: 'Test cop 4' },
  { lat: 5.010519, lng: 6.910345, name: 'Test cop 5' },
  { lat: 5.0323784, lng: 7.9246855, name: 'Test cop 6' }
];
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectType: false,
      showMap: false,
      userLat: null,
      userLon: null
    };

    this.toggleTypeModal = this.toggleTypeModal.bind(this);
  }

  async componentDidMount() {
    // get existing location permissions first
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.LOCATION
    );
    let finalStatus = existingStatus;

    // ask again to grant locaton permissions (if not already allowed)
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      finalStatus = status;
    }

    // still not allowed to use location?
    if (finalStatus !== 'granted') {
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync();

    this.setState({
      showMap: true,
      userLat: coords.latitude,
      userLon: coords.longitude
    });
  }

  toggleTypeModal() {
    this.setState(prevState => ({
      selectType: !prevState.selectType
    }));
  }

  render() {
    const { navigation, requestCop } = this.props;
    const { showMap, userLat, userLon } = this.state;
    return (
      <View style={gStyle.container}>
        {showMap && (
          <MapView
            followsUserLocation
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: userLat,
              longitude: userLon,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
            showsUserLocation
            loadingEnabled
            showsMyLocationButton
            style={styles.map}
          >
            <CopMarkerList cops={cops} />
          </MapView>
        )}

        {!showMap && (
          <View style={styles.containerNoLocation}>
            <Text style={styles.textLocationNeeded}>
              We need your location data...
            </Text>
            <TouchText
              onPress={() => Linking.openURL('app-settings:')}
              style={styles.btnGoTo}
              styleText={styles.btnGoToText}
              text="Go To Permissions"
            />
          </View>
        )}

        {showMap && (
          <View style={styles.containerNoLocation}>
            <Text style={styles.textLocationNeeded}>
              We need your location data...
            </Text>
            <RequestHelp
              onPress={() => {
                requestCop(userLat, userLon);
                navigation.navigate('ModalHelp');
              }}
              style={styles.btnGoTo}
              styleText={styles.btnGoToText}
              text="Request Help"
            />
          </View>
        )}

        <View style={styles.header}>
          <TouchIcon
            icon={<SvgMenu />}
            iconSize={32}
            onPress={() => navigation.toggleDrawer()}
          />

          <View style={styles.placeholder} />
          <TouchText
            onPress={() => navigation.navigate('ModalTutorial')}
            style={styles.help}
            text="Help"
            styleText={styles.styleText}
          />
        </View>
      </View>
    );
  }
}

Home.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
  requestCop: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  map: {
    height: device.height,
    position: 'absolute',
    width: device.width
  },
  containerNoLocation: {
    alignItems: 'center',
    height: device.height,
    justifyContent: 'center',
    position: 'absolute',
    width: device.width
  },
  textLocationNeeded: {
    fontFamily: fonts.uberMedium,
    fontSize: 16,
    marginBottom: 16
  },
  btnGoTo: {
    backgroundColor: colors.black,
    borderRadius: 3,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  btnGoToText: {
    color: colors.white,
    fontFamily: fonts.uberMedium,
    fontSize: 16
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: device.iPhoneX ? 58 : 34
  },
  help: {
    textAlign: 'center',
    width: 32
  },
  placeholder: {
    height: 32,
    width: 32
  },
  rightContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    width: 40
  },
  icon: {
    borderRadius: 18,
    height: 36,
    shadowColor: colors.black,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    width: 36
  },
  iconQRCode: {
    backgroundColor: colors.blue,
    marginBottom: 16
  },
  iconShield: {
    backgroundColor: colors.white
  },
  styleText: {
    fontSize: 18
  }
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    showMap: state.help.showMap,
    searching: state.help.searching,
    lat: state.userLat,
    lng: state.userLon
  };
};
// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    requestCop: (lat, lng) => {
      dispatch(helpRequest(lat, lng));
    }
  };
};
// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
