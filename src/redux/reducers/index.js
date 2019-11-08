import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import helpReducer from './helpReducer';
import authReducer from './authReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  help: helpReducer,
  auth: authReducer,
  form: formReducer
});
// Exports
export default rootReducer;
