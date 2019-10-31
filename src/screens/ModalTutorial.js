import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { gStyle } from '../constants';

// components
import ModalHeader from '../components/ModalHeader';

const ModalTutorial = ({ navigation }) => (
  <View style={gStyle.container}>
    <ModalHeader navigation={navigation} text="Help" />

    <View style={gStyle.p24}>
      <Text>About</Text>
    </View>
  </View>
);

ModalTutorial.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

export default ModalTutorial;
