import axios from 'axios';
import * as types from './types';

export const loginRequest = (user, pass) => {
  return async dispatch => {
    dispatch(loginRequestStarted());

    try {
      const res = await axios.post('/auth/login/', {
        username: user,
        password: pass
      });
      dispatch(loginRequestSuccess(res.data));
    } catch (error) {
      dispatch(loginRequestFailure(error.message));
    }
  };
};

export const registrationRequest = (userName, passWord, phoneNumber) => {
  return async dispatch => {
    dispatch(registrationRequestStarted());
    try {
      const res = await axios.post('/auth/registration/', {
        username: userName,
        password: passWord,
        phone_number: phoneNumber
      });
      dispatch(registrationRequestSuccess(res.data));
    } catch (error) {
      dispatch(registrationRequestFailure(error.message));
    }
  };
};

export const loadUserProfile = () => {
  return async dispatch => {
    dispatch(ProfileRequestStarted());
    console.log(11111111111111111111111111);
    try {
      const res = await axios.get('/auth/user/');
      console.log(res);
      dispatch(ProfileRequestSuccess(res.data));
    } catch (error) {
      console.log(222222222222222222222222222);
      dispatch(ProfileRequestFailure(error.message));
    }
  };
};

export const clearAuthError = () => {
  return dispatch => {
    dispatch({
      type: types.CLEAR_AUTH_ERROR
    });
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
// Login
const loginRequestSuccess = token => ({
  type: types.LOGGING_IN_SUCCESS,
  payload: {
    isLoading: false,
    ...token
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

// Register
const registrationRequestStarted = () => ({
  type: types.REGISTRATION_STARTED
});

const registrationRequestSuccess = data => ({
  type: types.REGISTRATION_SUCCESS,
  payload: {
    isLoading: false,
    ...data
  }
});

const registrationRequestFailure = error => ({
  type: types.REGISTRATION_ERROR,
  payload: {
    error
  }
});

// Profile
const ProfileRequestSuccess = data => ({
  type: types.REGISTRATION_SUCCESS,
  payload: {
    isRequesting: false,
    ...data
  }
});

const ProfileRequestFailure = data => ({
  type: types.REGISTRATION_SUCCESS,
  payload: {
    isRequesting: false,
    ...data
  }
});

const ProfileRequestStarted = token => ({
  type: types.LOGGING_IN_SUCCESS,
  payload: {
    isRequesting: false,
    ...token
  }
});

export default loginRequest;
