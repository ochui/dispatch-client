// Initial State
const initialState = {
  logging_in: false,
  token: null,
  error: {},
  isLoading: false
};
// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Logged In
    case 'LOGGING_IN': {
      return {
        // State
        ...state,
        // Redux Store
        logging_in: action.payload
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

export default authReducer;
