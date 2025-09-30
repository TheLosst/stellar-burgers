import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrderState } from 'src/services/types';
import {
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from './burger-api';

const initialState: TOrderState = {
  orders: [],
  status: 'idle',
  error: null,
  newOrder: {
    order: null,
    name: null,
    status: 'idle',
    error: null
  },
  orderDetails: {
    order: null,
    status: 'idle',
    error: null
  }
};

// Thunk для получения заказов пользователя
export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка загрузки заказов');
    }
  }
);

// Thunk для создания нового заказа
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка создания заказа');
    }
  }
);

// Thunk для получения деталей заказа по номеру
export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);

      if (!response.orders || response.orders.length === 0) {
        return rejectWithValue('Заказ не найден');
      }

      return response.orders[0]; // API возвращает массив с одним заказом
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка загрузки деталей заказа');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrdersError: (state) => {
      state.error = null;
    },
    clearNewOrderError: (state) => {
      state.newOrder.error = null;
    },
    clearOrderDetailsError: (state) => {
      state.orderDetails.error = null;
    },
    resetNewOrder: (state) => {
      state.newOrder = {
        order: null,
        name: null,
        status: 'idle',
        error: null
      };
    },
    resetOrderDetails: (state) => {
      state.orderDetails = {
        order: null,
        status: 'idle',
        error: null
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Get user orders cases
      .addCase(getUserOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Create order cases
      .addCase(createOrder.pending, (state) => {
        state.newOrder.status = 'loading';
        state.newOrder.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.newOrder.status = 'succeeded';
        state.newOrder.order = action.payload.order;
        state.newOrder.name = action.payload.name;
        state.newOrder.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.newOrder.status = 'failed';
        state.newOrder.error = action.payload as string;
      })

      // Get order by number cases
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderDetails.status = 'loading';
        state.orderDetails.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderDetails.status = 'succeeded';
        state.orderDetails.order = action.payload;
        state.orderDetails.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.orderDetails.status = 'failed';
        state.orderDetails.error = action.payload as string;
      });
  }
});

export const {
  clearOrdersError,
  clearNewOrderError,
  clearOrderDetailsError,
  resetNewOrder,
  resetOrderDetails
} = ordersSlice.actions;

export default ordersSlice.reducer;
