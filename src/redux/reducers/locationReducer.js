import { AsyncStorage } from 'react-native';
import update from 'immutability-helper';
import { persistReducer } from 'redux-persist';
import * as types from '../action/types';

// Initial State
const initialState = {
  lat: null,
  lng: null,
  ready: false,
  requesting: false
};

const persistConfig = {
  key: 'location',
  storage: AsyncStorage,
  blacklist: ['ready', 'requesting', 'lat', 'lng']
};

// Reducers (Modifies The State And Returns A New State)
const locationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOCATION_REQUEST_STARTED: {
      return update(state, {
        requesting: {
          $set: true
        }
      });
    }
    case types.LOCATION_REQUEST_SUCCESS: {
      return update(state, {
        requesting: {
          $set: false
        },
        lat: {
          $set: payload.lat
        },
        lng: {
          $set: payload.lng
        }
      });
    }
    case types.LOCATION_REQUEST_ERROR: {
      return update(state, {
        requesting: {
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

export default persistReducer(persistConfig, locationReducer);
