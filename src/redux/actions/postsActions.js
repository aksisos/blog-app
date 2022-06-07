import { fetchRequest } from '../../services/services';
import { getToken } from '../../utils/utils';
import {
  clearPostStateType,
  setPostsArrayType,
  setPostType,
  updateTagListType,
} from '../action-types';

import { errorCatch, errorInet } from './clientActions';

export const setPostsArray = (payload) => ({
  type: setPostsArrayType,
  payload,
});

export const setPost = (payload) => ({ type: setPostType, payload });

export const clearPostState = () => ({ type: clearPostStateType });

export const updateTagList = (payload) => ({
  type: updateTagListType,
  payload,
});

export const getPosts = (page) => async (dispatch) => {
  try {
    const response = await fetchRequest(
      `articles?limit=5&offset=${(page - 1) * 5}`,
      'GET',
      getToken()
    );

    const res = await response.json();
    dispatch(setPostsArray(res));
    return res;
  } catch (err) {
    dispatch(errorCatch(err));
    return err.message;
  }
};

export const getFullPost = (slug) => async (dispatch) => {
  try {
    const response = await fetchRequest(
      `articles/${slug}`,
      'GET',
      getToken()
    );
    const res = await response.json();
  
    dispatch(setPost(res));
    return res;
  } catch (err) {
    dispatch(errorInet(err.message));
    return err.message;
  }
};

export const favoriteArticle = async (slug, auth) => {
  try {
    const response = await fetchRequest(
      `articles/${slug}/favorite`,
      'POST',
      auth
    );

    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  } catch (err) {
    alert('Authentication required');
    return err.message;
  }
};

export const unfavoriteArticle = async (slug, auth) => {
  try {
    const response = await fetchRequest(
      `articles/${slug}/favorite`,
      'DELETE',
      auth
    );

    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  } catch (err) {
    alert('Authentication required');
    return err.message;
  }
};
