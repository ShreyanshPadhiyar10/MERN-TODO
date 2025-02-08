// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/user/userSlice';
import todoReducer from '../redux/todo/todoSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;