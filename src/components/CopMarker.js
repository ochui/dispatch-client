import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import SvgCheckShield from './icons/Svg.CheckShield';
import TouchIcon from './TouchIcon';
import { colors } from '../constants';

const CopMarker = ({ lat, lng }) => (
  <MapView.Marker
    coordinate={{
      latitude: lat,
      longitude: lng
    }}
  >
    {/* <View style={{ backgroundColor: 'red', padding: 10 }}>
      <Text>{name}</Text>
      <SvgCheckShield />
    </View> */}
    <TouchIcon
      icon={<SvgCheckShield />}
      iconSize={20}
      onPress={() => {}}
      style={[styles.icon, styles.iconShield]}
    />
  </MapView.Marker>
);

CopMarker.propTypes = {
  // required
  //   image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  // name: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
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
  }
});
export default CopMarker;
