import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput, Image, Dimensions } from 'react-native';

const UserInput = props => {
  const { input, source } = props;

  return (
    <View style={styles.inputWrapper}>
      <Image source={source} style={styles.inlineImg} />
      <TextInput
        {...props}
        style={styles.input}
        // placeholder={placeholder}
        // secureTextEntry={secureTextEntry}
        // autoCorrect={autoCorrect}
        // autoCapitalize={autoCapitalize}
        // returnKeyType={returnKeyType}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        // value={input.value}
      />
    </View>
  );
};

export default UserInput;

UserInput.defaultProps = {
  secureTextEntry: false,
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
  returnKeyType: PropTypes.string,
  input: PropTypes.object.isRequired
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
