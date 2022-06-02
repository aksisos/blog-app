/* eslint-disable no-prototype-builtins */
import { apiUrl } from '../../config';
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
    const response = await fetch(`${apiUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(formData),
    });
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
    const response = await fetch(`${apiUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(formData),
    });
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
  const response = await fetch(`${apiUrl}/user`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  const res = await response.json();

  dispatch(setUser(res));
  dispatch(loadingEnd());

  dispatch(authToggle(true));
  return res;
};
