import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import Constants from 'expo-constants';
// import PropTypes from 'prop-types';
import { colors, device, fonts } from '../constants';

const CustomDrawerContent = () => (
  <View style={styles.container}>
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <View
          style={{
            height: 150,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image
            style={{ height: 120, width: 120, borderRadius: 60 }}
            source={{
              uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'
            }}
          />
        </View>
        {/* <DrawerItems {...props} /> */}
      </SafeAreaView>
    </ScrollView>
    <View style={styles.containerVersion}>
      <Text style={styles.versionText}>{`v${Constants.manifest.version}`}</Text>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            'Log out',
            'Do you want to logout?',
            [
              {
                text: 'Cancel',
                onPress: () => {
                  return null;
                }
              },
              {
                text: 'Confirm',
                onPress: () => {}
              }
            ],
            { cancelable: false }
          )
        }
      >
        <View style={styles.item}>
          <View style={styles.iconContainer} />
          <Text style={styles.logoutText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

// CustomDrawerContent.propTypes = {
// required
// navigation: PropTypes.object.isRequired
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  containerVersion: {
    bottom: device.iPhoneX ? 40 : 16,
    paddingHorizontal: 38,
    position: 'absolute',
    width: '100%'
  },
  versionText: {
    color: colors.grey,
    fontFamily: fonts.uberRegular,
    fontSize: 20,
    textAlign: 'right'
  },
  logoutText: {
    color: colors.grey,
    fontFamily: fonts.uberRegular,
    fontSize: 20,
    textAlign: 'left'
  }
});

export default CustomDrawerContent;
