import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '@/store/slices/postsSlice';

const rootReducer = {
  posts: postsReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;