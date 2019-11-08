import update from 'immutability-helper';
import * as types from '../action/types';

// Initial State
const initialState = {
  logging_in: false,
  token: null,
  error: {},
  isLoading: false
};
// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Logged In
    case types.LOGGING_IN_STARTED: {
      return update(state, {
        isLoading: {
          $set: true
        }
      });
    }
    case types.LOGGING_IN_ERROR: {
      return update(state, {
        isLoading: {
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

export default authReducer;
