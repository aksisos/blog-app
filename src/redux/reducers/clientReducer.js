import {
  clearErrorsType,
  errorCatchType,
  loadingEndType,
  loadingStartType,
  errorInetType
} from '../action-types';

const initialState = {
  isLoading: false,
  serverErrors: null,
};

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
  case loadingStartType:
    return {
      ...state,
      isLoading: true,
    };
  case loadingEndType:
    return {
      ...state,
      isLoading: false,
    };
  case errorCatchType:
    return {
      ...state,
      serverErrors: action.payload.errors,
    };
  case errorInetType:
    return {
      ...state,
      serverErrors: action.payload,
    };
  case clearErrorsType:
    return {
      ...state,
      serverErrors: null,
    };

  default:
    return state;
  }
};
