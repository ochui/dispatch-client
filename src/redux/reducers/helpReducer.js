// Initial State
const initialState = {
  searching: false
};
// Reducers (Modifies The State And Returns A New State)
const helpReducer = (state = initialState, action) => {
  switch (action.type) {
    // Logged In
    case 'SEARCHING': {
      return {
        // State
        ...state,
        // Redux Store
        searching: action.trueFalse
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

export default helpReducer;
