/* eslint-disable no-prototype-builtins */
import { BlogService } from '../../services/blogService';
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

const blogService = new BlogService();

export const register = (formData) => async (dispatch) => {
  try {
    dispatch(loadingStart());
    const response = await blogService.setRegister(formData);

    if (response.hasOwnProperty('errors')) {
      dispatch(errorCatch(response));
    }
    if (!response.hasOwnProperty('errors')) {
      dispatch(setUser(response));
      setToken(response.user);
      dispatch(authToggle(true));
      dispatch(clearErrors());
    }
  
    dispatch(loadingEnd());
    return response;
  } catch (err) {
    dispatch(errorInet(err.message));
    return err.message;
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(loadingStart());
    const response = await blogService.setLogin(formData);
    
    if (response.hasOwnProperty('errors')) {
      dispatch(errorCatch(response));
    }
    if (!response.hasOwnProperty('errors')) {
      dispatch(setUser(response));
      setToken(response.user);
      dispatch(authToggle(true));
    }
    
    dispatch(loadingEnd());
    return response;
  } catch (err) {
    dispatch(errorInet(err.message));
    return err.message;
  }
};

export const userByToken = () => async (dispatch) => {
  dispatch(loadingStart());
  const response = await blogService.getUserByToken();

  dispatch(setUser(response));
  dispatch(loadingEnd());

  dispatch(authToggle(true));
  return response;
};
