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

export const registrationRequest = (userName, passWord) => {
  return async dispatch => {
    dispatch(registrationRequestStarted());
    try {
      const res = await axios.post('/auth/registration/', {
        username: userName,
        password1: passWord,
        password2: passWord
        // phone_number: phoneNumber
      });
      dispatch(registrationRequestSuccess(res.data));
      loginRequest(userName, passWord);
    } catch (error) {
      dispatch(registrationRequestFailure(error.message));
    }
  };
};

export const loadUserProfile = () => {
  return async dispatch => {
    dispatch(ProfileRequestStarted());
    try {
      const res = await axios.get('/auth/user/');
      dispatch(ProfileRequestSuccess(res.data));
    } catch (error) {
      dispatch(ProfileRequestFailure(error.message));
    }
  };
};

export const requestLogout = () => {};

export const clearAuthError = () => {
  return async dispatch => {
    try {
      const res = await axios.post('auth/logout/');
      dispatch({
        type: types.CLEAR_AUTH_ERROR,
        payload: res.data
      });
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
  type: types.LOAD_PROFILE_SUCCESS,
  payload: {
    ...data
  }
});

const ProfileRequestFailure = error => ({
  type: types.LOAD_PROFILE_ERROR,
  payload: {
    ...error
  }
});

const ProfileRequestStarted = token => ({
  type: types.LOAD_PROFILE_STARTED
});

export default loginRequest;
