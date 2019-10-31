import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import ModalHeader from '../components/ModalHeader';
import { gStyle } from '../constants';

const ModalHelp = ({ navigation }) => (
  <View style={gStyle.container}>
    <ModalHeader navigation={navigation} text="Please wait.." />

    <View style={gStyle.p24}>
      <Text>Hang on, we are a contact security personnel near you</Text>
    </View>
    <DotIndicator color="black" />
  </View>
);

ModalHelp.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

export default ModalHelp;
