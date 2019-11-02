import { combineReducers } from 'redux';
import helpReducer from './helpReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  help: helpReducer
});
// Exports
export default rootReducer;
