import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TBurgerApiReducer } from 'src/services/types';

const initialState = {
  ingredients: [],
  ingredientsStatus: 'idle'
} satisfies TBurgerApiReducer as TBurgerApiReducer;

export const fetchIngredients = createAsyncThunk(
  'burger/fetchIngredients',
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      // Add user to the state array
      state.ingredients = action.payload; //state buns, mains, sauces = action.payload.filter()
      state.ingredientsStatus = 'succeeded';
    });
    builder.addCase(fetchIngredients.pending, (state, action) => {
      state.ingredientsStatus = 'loading';
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.ingredientsStatus = 'failed';
    });
  }
});
