import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { TBurgerApiReducer } from 'src/services/types';

const initialState = {
  ingredients: {
    buns: [],
    mains: [],
    sauces: []
  },
  ingredientList: [],
  ingredientsStatus: 'idle'
} satisfies TBurgerApiReducer as TBurgerApiReducer;

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIngredientsApi();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredientList = action.payload;
      // Add user to the state array
      state.ingredients.buns = action.payload.filter(
        (ele: TIngredient) => ele.type === 'bun'
      ); //state buns, mains, sauces = action.payload.filter()
      state.ingredients.sauces = action.payload.filter(
        (ele: TIngredient) => ele.type === 'sauce'
      );
      state.ingredients.mains = action.payload.filter(
        (ele: TIngredient) => ele.type === 'main'
      );
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
