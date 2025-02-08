// src/redux/user/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: true,
  error: null,
};

// Async thunk for login
export const getCurrentLoginUser = createAsyncThunk(
  'fetchUser',
  async () => {
    const response = await axios.get('/api/v1/users/current-user');
    return response.data; // Assuming the response contains the user data and tokens
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutAction(state) {
      state.user = null
    },
    setLoaderAction(state, action) {
      state.loading = action.payload
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutAction, setLoaderAction } = userSlice.actions
export default userSlice.reducer;