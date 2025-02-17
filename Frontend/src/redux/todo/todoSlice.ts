// src/redux/todoSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../axios/axios';

interface TodoState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  todos: any[];
  loading: boolean;
  error?: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

// Async thunk for get todos
export const getTodos = createAsyncThunk(
  'getTodos',
  async () => {
    const response = await axiosInstance.get('/api/v1/todo/fetch-todos');
    return response.data;
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export const { } = todoSlice.actions;
export default todoSlice.reducer;