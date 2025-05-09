import { combineReducers } from '@reduxjs/toolkit';
import postsSlice from './postsSlice';
import userSlice from './userSlice';

export const rootReducer = combineReducers({
  posts: postsSlice,
  user: userSlice,
});