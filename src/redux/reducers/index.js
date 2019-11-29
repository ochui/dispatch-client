import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import helpReducer from './helpReducer';
import authReducer from './authReducer';
import locationReducer from './locationReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  help: helpReducer,
  auth: authReducer,
  form: formReducer,
  location: locationReducer
});
// Exports
export default rootReducer;
