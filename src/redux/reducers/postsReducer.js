import {
  clearPostStateType,
  setPostsArrayType,
  setPostType,
  updateTagListType,
} from '../action-types';

const initialState = {
  posts: [],
  postsCount: 0,
  post: {},
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
  case setPostsArrayType:
    return {
      ...state,
      posts: action.payload.articles,
      postsCount: action.payload.articlesCount,
    };
  case setPostType:
    return {
      ...state,
      post: action.payload,
    };
  case clearPostStateType:
    return {
      ...state,
      post: null,
    };
  case updateTagListType:
    return {
      ...state,
      tagList: action.payload,
    };
  default:
    return state;
  }
};
