import { AsyncStorage } from 'react-native';
import update from 'immutability-helper';
import { persistReducer } from 'redux-persist';
import * as types from '../action/types';

// Initial State
const initialState = {
  searching: false,
  cops: [],
  error: {},
  socketIsOpen: false,
  data: {},
  isOpen: false,
  connected: false
};

const persistConfig = {
  key: 'help',
  storage: AsyncStorage,
  blacklist: ['cops', 'socketIsOpen', 'error', 'data'],
  whitelist: ['searching']
};

// Reducers (Modifies The State And Returns A New State)
const helpReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SEARCHING_STARTED: {
      return update(state, {
        searching: {
          $set: true
        },
        isOpen: {
          $set: true
        }
      });
    }
    case types.SEARCHING_SUCCESS: {
      return update(state, {
        searching: {
          $set: false
        },
        cops: {
          $set: payload
        }
      });
    }
    case types.SEARCHING_ERROR: {
      return update(state, {
        searching: {
          $set: false
        },
        error: {
          $set: payload
        },
        isOpen: {
          $set: false
        },
        cops: {
          $set: []
        }
      });
    }
    case 'REDUX_WEBSOCKET::OPEN': {
      return update(state, {
        socketIsOpen: {
          $set: true
        }
      });
    }
    case 'REDUX_WEBSOCKET::MESSAGE': {
      return update(state, {
        data: {
          $set: payload.message
        },
        isOpen: {
          $set: false
        }
      });
    }
    // Default
    default: {
      return state;
    }
  }
};

export default persistReducer(persistConfig, helpReducer);
