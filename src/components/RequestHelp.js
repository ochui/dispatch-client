import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { gStyle } from '../constants';

const RequestHelp = ({ onPress, style, styleText, text }) => (
  <TouchableOpacity
    activeOpacity={gStyle.activeOpacity}
    hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
    onPress={onPress}
    style={[gStyle.flexCenter, style]}
  >
    <Text style={styleText}>{text}</Text>
  </TouchableOpacity>
);

RequestHelp.defaultProps = {
  style: {},
  styleText: {}
};

RequestHelp.propTypes = {
  // required
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,

  // optional
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object
  ]),
  styleText: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object
  ])
};

export default RequestHelp;
