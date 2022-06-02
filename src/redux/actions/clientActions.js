import {
  clearErrorsType,
  errorCatchType,
  loadingEndType,
  loadingStartType,
  errorInetType
} from '../action-types';

export const loadingStart = () => ({ type: loadingStartType });

export const loadingEnd = () => ({ type: loadingEndType });

export const errorCatch = (payload) => ({ type: errorCatchType, payload });

export const errorInet = (payload) => ({ type: errorInetType, payload });

export const clearErrors = () => ({ type: clearErrorsType });
