import {
  clearErrorsType,
  errorCatchType,
  loadingEndType,
  loadingStartType,
} from '../action-types';

export const loadingStart = () => ({ type: loadingStartType });

export const loadingEnd = () => ({ type: loadingEndType });

export const errorCatch = (payload) => ({ type: errorCatchType, payload });

export const clearErrors = () => ({ type: clearErrorsType });
