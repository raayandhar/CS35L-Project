const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

const initialState = {
  user: {
    id: null,     // Ensure default structure
    name: '',     // Default as an empty string
    friends: [],  // Default as an empty array
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: {
          id: action.payload?.userID ?? null,        // Use payload or default value
          name: action.payload?.username ?? '',     // Use payload or default value
          friends: action.payload?.friends ?? [], // Use payload or default value
        },
      };
    case CLEAR_USER:
    return {
        ...state,
        user: {
            id: null,
            name: null,
            friends: [],
        },
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
