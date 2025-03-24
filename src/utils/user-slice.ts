import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUserState } from 'src/services/types';

const initialState = {
  state: { isAuthenticated: false },
  email: '',
  name: ''
} satisfies TUserState as TUserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {}
});

export default userSlice.reducer;
