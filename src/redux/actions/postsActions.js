import { BlogService } from '../../services/blogService';
import {
  clearPostStateType,
  setPostsArrayType,
  setPostType,
  updateTagListType,
} from '../action-types';

import { errorCatch, errorInet } from './clientActions';

const blogService = new BlogService();

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
    const response = await blogService.getPosts(page);

    dispatch(setPostsArray(response));
    return response;
  } catch (err) {
    dispatch(errorCatch(err));
    return err.message;
  }
};

export const getFullPost = (slug) => async (dispatch) => {
  try {
    const response = await blogService.getFullPost(slug);
  
    dispatch(setPost(response));
    return response;
  } catch (err) {
    dispatch(errorInet(err.message));
    return err.message;
  }
};

export const favoriteArticle = async (slug) => {
  try {
    const response = await blogService.setFavoriteArticle(slug);

    if (!response.ok) {
      throw new Error();
    }

    return response;
  } catch (err) {
    alert('Authentication required');
    return err.message;
  }
};

export const unfavoriteArticle = async (slug) => {
  try {
    const response = await blogService.setUnfavoriteArticle(slug);

    if (!response.ok) {
      throw new Error();
    }

    return response;
  } catch (err) {
    alert('Authentication required');
    return err.message;
  }
};
