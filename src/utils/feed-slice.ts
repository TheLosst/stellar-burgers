import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TFeedState } from 'src/services/types';
import { getFeedsApi } from './burger-api';

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: 'idle',
  error: null
};

// Thunk для получения ленты заказов
export const getFeeds = createAsyncThunk(
  'feed/getFeeds',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка загрузки ленты заказов');
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeedError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { clearFeedError } = feedSlice.actions;
export default feedSlice.reducer;
