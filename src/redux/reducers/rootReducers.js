import { combineReducers } from 'redux';

import { clientReducer } from './clientReducer';
import { postsReducer } from './postsReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  client: clientReducer,
});
