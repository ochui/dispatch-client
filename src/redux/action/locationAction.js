import * as types from './types';

export const LocationRequestSuccess = (lat, lng) => {
  return dispatch => {
    dispatch({
      type: types.LOCATION_REQUEST_SUCCESS,
      payload: {
        lat,
        lng
      }
    });
  };
};

export const LocationRequestStarted = () => {
  return dispatch => {
    dispatch({
      type: types.LOCATION_REQUEST_STARTED
    });
  };
};

export const LocationRequestFailure = () => {
  return dispatch => {
    dispatch({
      type: types.LOCATION_REQUEST_ERROR
    });
  };
};
