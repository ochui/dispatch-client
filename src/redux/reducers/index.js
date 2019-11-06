import { combineReducers } from 'redux';
import helpReducer from './helpReducer';
import authReducer from './authReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  help: helpReducer,
  auth: authReducer
});
// Exports
export default rootReducer;
