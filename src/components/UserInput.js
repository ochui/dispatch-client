import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput, Image, Dimensions } from 'react-native';

const UserInput = props => {
  const {
    source,
    placeholder,
    secureTextEntry,
    autoCorrect,
    autoCapitalize,
    returnKeyType
  } = props;
  return (
    <View style={styles.inputWrapper}>
      <Image source={source} style={styles.inlineImg} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        returnKeyType={returnKeyType}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

export default UserInput;

UserInput.defaultProps = {
  secureTextEntry: true,
  autoCorrect: true,
  autoCapitalize: false,
  returnKeyType: 'none'
};

UserInput.propTypes = {
  source: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string
};

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff'
  },
  inputWrapper: {
    flex: 1
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9
  }
});
