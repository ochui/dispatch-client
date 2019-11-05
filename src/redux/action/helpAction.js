import axios from 'axios';
import * as types from './types';

const helpRequest = ({ lat, lng }) => {
  return async dispatch => {
    dispatch(helpRequestStarted());

    try {
      const res = await axios.get('/cops');
      dispatch(helpRequestSuccess(res.data));
    } catch (error) {
      dispatch(helpRequestFailure(error.message));
    }
  };
};

export const loadCops = () => {
  return async dispatch => {
    dispatch(helpRequestStarted());

    try {
      const res = await axios.get('/cops');
      dispatch(helpRequestSuccess(res.data));
    } catch (error) {
      dispatch(helpRequestFailure(error.message));
    }
  };
};

const helpRequestSuccess = location => ({
  type: types.SEARCHING_SUCCESS,
  payload: {
    searching: false,
    ...location
  }
});

const helpRequestStarted = () => ({
  type: types.SEARCHING_STARTED,
  payload: {
    searching: true
  }
});

const helpRequestFailure = error => ({
  type: types.SEARCHING_ERROR,
  payload: {
    error
  }
});

export default helpRequest;
