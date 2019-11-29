import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import reduxWebsocket from '@giantmachines/redux-websocket';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

// Create the middleware instance.
const reduxWebsocketMiddleware = reduxWebsocket();
// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root-dev-new-new-',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['auth', 'help'],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: []
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, reduxWebsocketMiddleware)
);
// Middleware: Redux Persist Persister
const persistor = persistStore(store);
// Exports
export { store, persistor };
