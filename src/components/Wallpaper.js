import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ImageBackground } from 'react-native';

import bgSrc from '../assets/images/wallpaper.jpg';

const Wallpaper = props => {
  const { children } = props;
  return (
    <ImageBackground style={styles.picture} source={bgSrc}>
      {children}
    </ImageBackground>
  );
};

export default Wallpaper;

// Wallpaper.PropTypes = {
//   children: PropT
// };

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,0,0,0.5)'
  }
});
