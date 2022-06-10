import { Service } from '../../services/services';
import {
  clearPostStateType,
  setPostsArrayType,
  setPostType,
  updateTagListType,
} from '../action-types';

import { errorCatch, errorInet } from './clientActions';

const api = new Service();

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
    const response = await api.getPostsFetch(page);

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
    const response = await api.getFullPostFetch(slug);
    const res = await response.json();
  
    dispatch(setPost(res));
    return res;
  } catch (err) {
    dispatch(errorInet(err.message));
    return err.message;
  }
};

export const favoriteArticle = async (slug) => {
  try {
    const response = await api.favoriteArticleFetch(slug);

    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  } catch (err) {
    alert('Authentication required');
    return err.message;
  }
};

export const unfavoriteArticle = async (slug) => {
  try {
    const response = await api.unfavoriteArticleFetch(slug);

    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  } catch (err) {
    alert('Authentication required');
    return err.message;
  }
};
