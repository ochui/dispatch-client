import axios from 'axios';
import * as types from './types';

const helpRequest = ({ lat, lng }) => {
  return dispatch => {
    dispatch(helpRequestStarted());

    axios
      .post(`https://jsonplaceholder.typicode.com/todos`, {
        lat,
        lng
      })
      .then(res => {
        dispatch(helpRequestSuccess(res.data));
      })
      .catch(err => {
        dispatch(helpRequestFailure(err.message));
      });
  };
};

const helpRequestSuccess = location => ({
  type: types.SEARCHING_SUCCESS,
  payload: {
    ...location
  }
});

const helpRequestStarted = () => ({
  type: types.SEARCHING_STARTED
});

const helpRequestFailure = error => ({
  type: types.SEARCHING_ERROR,
  payload: {
    error
  }
});

export default helpRequest;
