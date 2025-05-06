import { combineReducers } from '@reduxjs/toolkit';
import postsSlice from './postsSlice';
import todoSlice from './todoSlice';

export const rootReducer = combineReducers({
  posts: postsSlice,
  todos: todoSlice,
});