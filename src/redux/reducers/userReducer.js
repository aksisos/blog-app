import { authToggleType, logoutType, setUserType } from '../action-types';

const initialState = {
  user: null,
  auth: false,
};

// eslint-disable-next-line default-param-last
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case setUserType:
    return {
      ...state,
      user: action.payload.user,
    };
  case logoutType:
    return {
      ...state,
      user: null,
    };

  case authToggleType:
    return {
      ...state,
      auth: action.payload,
    };
  default:
    return state;
  }
};
