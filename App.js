import React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { func } from './src/constants';
import { store, persistor } from './src/redux/store';
import Stack from './src/navigation/Stack';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <AppLoading
          onFinish={() => this.setState({ isLoading: false })}
          startAsync={func.loadAssetsAsync}
        />
      );
    }

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Fragment>
            <StatusBar barStyle="dark-content" />
            <Stack />
          </React.Fragment>
        </PersistGate>
      </Provider>
    );
  }
}
