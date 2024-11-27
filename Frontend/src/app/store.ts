// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/user/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;