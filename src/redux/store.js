import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';
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
  applyMiddleware(thunk, createLogger())
);
// Middleware: Redux Persist Persister
const persistor = persistStore(store);
// Exports
export { store, persistor };
