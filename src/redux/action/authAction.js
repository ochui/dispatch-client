import axios from 'axios';
import * as types from './types';

const loginRequest = () => {
  return async dispatch => {
    dispatch(loginRequestStarted());

    try {
      const res = await axios.post('/auth/login');
      dispatch(loginRequestSuccess(res.data));
    } catch (error) {
      dispatch(loginRequestFailure(error.message));
    }
  };
};

export const loadCops = () => {
  return async dispatch => {
    dispatch(loginRequestStarted());

    try {
      const res = await axios.get('/cops');
      dispatch(loginRequestSuccess(res.data));
    } catch (error) {
      dispatch(loginRequestFailure(error.message));
    }
  };
};

const loginRequestSuccess = location => ({
  type: types.LOGGING_IN_SUCCESS,
  payload: {
    isLoading: false,
    ...location
  }
});

const loginRequestStarted = () => ({
  type: types.LOGGING_IN_STARTED,
  payload: {
    isLoading: true
  }
});

const loginRequestFailure = error => ({
  type: types.LOGGING_IN_ERROR,
  payload: {
    error
  }
});

export default loginRequest;
