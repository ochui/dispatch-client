import { AsyncStorage } from 'react-native';
import update from 'immutability-helper';
import { persistReducer } from 'redux-persist';
import * as types from '../action/types';

// Initial State
const initialState = {
  logging_in: false,
  token: null,
  error: {},
  isLoading: false,
  isRequesting: false
};

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: ['isLoading', 'logging_in', 'error', 'isRequesting'],
  whitelist: ['token']
};
// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // Logged In
    case types.LOGGING_IN_STARTED: {
      return update(state, {
        isLoading: {
          $set: true
        },
        error: {
          $set: null
        }
      });
    }
    case types.LOGGING_IN_ERROR: {
      return update(state, {
        isLoading: {
          $set: false
        },
        error: {
          $set: payload
        }
      });
    }
    case types.LOGGING_IN_SUCCESS: {
      return update(state, {
        isLoading: {
          $set: false
        },
        token: {
          $set: payload.key
        },
        logging_in: {
          $set: true
        }
      });
    }
    // Registration
    case types.REGISTRATION_STARTED: {
      return update(state, {
        isLoading: {
          $set: true
        },
        error: {
          $set: null
        }
      });
    }
    case types.REGISTRATION_ERROR: {
      return update(state, {
        isLoading: {
          $set: false
        },
        error: {
          $set: payload
        }
      });
    }
    case types.REGISTRATION_SUCCESS: {
      return update(state, {
        isLoading: {
          $set: false
        },
        token: {
          $set: payload.key
        },
        logging_in: {
          $set: true
        }
      });
    }

    // Profile
    case types.LOAD_PROFILE_STARTED: {
      return update(state, {
        isRequesting: {
          $set: true
        }
      });
    }
    case types.CLEAR_AUTH_ERROR: {
      return update(state, {
        error: {
          $set: null
        }
      });
    }
    // Default
    default: {
      return state;
    }
  }
};

export default persistReducer(persistConfig, authReducer);
