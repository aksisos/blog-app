/* eslint-disable no-prototype-builtins */
import { fetchRequest, logReg } from '../../services/services';
import { setToken } from '../../utils/utils';
import { authToggleType, logoutType, setUserType } from '../action-types';

import {
  clearErrors,
  errorCatch,
  loadingEnd,
  loadingStart,
  errorInet
} from './clientActions';

export const setUser = (payload) => ({ type: setUserType, payload });

export const logout = () => ({ type: logoutType });

export const authToggle = (payload) => ({ type: authToggleType, payload });

export const register = (formData) => async (dispatch) => {
  try {
    dispatch(loadingStart());
    const response = await logReg(
      'users',
      'POST',
      formData
    );
    const res = await response.json();
    if (res.hasOwnProperty('errors')) {
      dispatch(errorCatch(res));
    }
    if (!res.hasOwnProperty('errors')) {
      dispatch(setUser(res));
      setToken(res.user);
      dispatch(authToggle(true));
      dispatch(clearErrors());
    }
  
    dispatch(loadingEnd());
    return res;
  } catch (err) {
    dispatch(errorInet(err.message));
    return err.message;
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(loadingStart());
    const response = await logReg(
      'users/login',
      'POST',
      formData
    );
    const res = await response.json();
    
    if (res.hasOwnProperty('errors')) {
      dispatch(errorCatch(res));
    }
    if (!res.hasOwnProperty('errors')) {
      dispatch(setUser(res));
      setToken(res.user);
      dispatch(authToggle(true));
    }
    dispatch(loadingEnd());
    return res;
  } catch (err) {
    dispatch(errorInet(err.message));
    return err.message;
  }
};

export const getUserByToken = (token) => async (dispatch) => {
  dispatch(loadingStart());
  const response = await fetchRequest(
    'user',
    'GET',
    token
  );
  const res = await response.json();

  dispatch(setUser(res));
  dispatch(loadingEnd());

  dispatch(authToggle(true));
  return res;
};
