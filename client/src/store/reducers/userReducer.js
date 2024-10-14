const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

const initialState = {
  user: null, 
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null, 
      };
    default:
      return state;
  }
};

export const setUser = (userInfo) => ({
  type: SET_USER,
  payload: userInfo,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export default userReducer;
