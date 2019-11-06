import axios from 'axios';
import * as types from './types';

const loginRequest = () => {
  return async dispatch => {
    dispatch(loginRequestStarted());

    try {
      const res = await axios.get('/auth/login');
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
  type: types.SEARCHING_SUCCESS,
  payload: {
    searching: false,
    ...location
  }
});

const loginRequestStarted = () => ({
  type: types.SEARCHING_STARTED,
  payload: {
    searching: true
  }
});

const loginRequestFailure = error => ({
  type: types.SEARCHING_ERROR,
  payload: {
    error
  }
});

export default loginRequest;
