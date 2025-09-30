import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUserState } from 'src/services/types';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  TRegisterData,
  TLoginData
} from './burger-api';
import { setCookie, deleteCookie } from './cookie';

const initialState = {
  state: {
    isAuthenticated: false,
    isLoading: false,
    loginError: null,
    registerError: null
  },
  email: '',
  name: ''
} satisfies TUserState as TUserState;

// Thunk для регистрации пользователя
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка регистрации');
    }
  }
);

// Thunk для входа пользователя
export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(userData);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка входа');
    }
  }
);

// Thunk для выхода пользователя
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка выхода');
    }
  }
);

// Thunk для получения данных пользователя
export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Ошибка получения данных пользователя'
      );
    }
  }
);

// Thunk для обновления данных пользователя
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userData);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка обновления данных');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.state.loginError = null;
      state.state.registerError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.state.isLoading = true;
        state.state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.state.isLoading = false;
        state.state.isAuthenticated = true;
        state.state.registerError = null;
        state.email = action.payload.email;
        state.name = action.payload.name;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.state.isLoading = false;
        state.state.registerError = action.payload as string;
      })

      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.state.isLoading = true;
        state.state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.state.isLoading = false;
        state.state.isAuthenticated = true;
        state.state.loginError = null;
        state.email = action.payload.email;
        state.name = action.payload.name;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.state.isLoading = false;
        state.state.loginError = action.payload as string;
      })

      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.state.isAuthenticated = false;
        state.email = '';
        state.name = '';
        state.state.loginError = null;
        state.state.registerError = null;
      })

      // GetUser cases
      .addCase(getUser.pending, (state) => {
        state.state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.state.isLoading = false;
        state.state.isAuthenticated = true;
        state.email = action.payload.email;
        state.name = action.payload.name;
      })
      .addCase(getUser.rejected, (state) => {
        state.state.isLoading = false;
        state.state.isAuthenticated = false;
      })

      // UpdateUser cases
      .addCase(updateUser.pending, (state) => {
        state.state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.state.isLoading = false;
        state.email = action.payload.email;
        state.name = action.payload.name;
      })
      .addCase(updateUser.rejected, (state) => {
        state.state.isLoading = false;
      });
  }
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
