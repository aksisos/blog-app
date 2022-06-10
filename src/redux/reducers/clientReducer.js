import {
  clearErrorsType,
  errorCatchType,
  loadingEndType,
  loadingStartType,
  errorInetType,
  trueEditType,
  falseEditType
} from '../action-types';

const initialState = {
  isLoading: false,
  serverErrors: null,
  isEdit: false,
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
  case trueEditType:
    return {
      ...state,
      isEdit: true,
    };
  case falseEditType:
    return {
      ...state,
      isEdit: false,
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
