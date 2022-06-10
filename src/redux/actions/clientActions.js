import {
  clearErrorsType,
  errorCatchType,
  loadingEndType,
  loadingStartType,
  errorInetType,
  trueEditType,
  falseEditType,
} from '../action-types';

export const loadingStart = () => ({ type: loadingStartType });

export const loadingEnd = () => ({ type: loadingEndType });

export const trueEdit = () => ({ type: trueEditType });

export const falseEdit = () => ({ type: falseEditType });

export const errorCatch = (payload) => ({ type: errorCatchType, payload });

export const errorInet = (payload) => ({ type: errorInetType, payload });

export const clearErrors = () => ({ type: clearErrorsType });
