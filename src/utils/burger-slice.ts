import { getIngredientsApi } from '@api';
import {
  createAction,
  createAsyncThunk,
  createReducer,
  createSlice
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { TBurgerApiReducer, TPickedIngridients } from 'src/services/types';

const pickedIngridientsInitialState = {
  bunTop: null,
  main: [],
  bunBottom: null
} satisfies TPickedIngridients;

const initialState = {
  ingredients: {
    buns: [],
    mains: [],
    sauces: []
  },
  ingredientList: [],
  ingredientsStatus: 'idle',
  pickedIngridients: pickedIngridientsInitialState
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

export const setBunTop = createAction<TIngredient>(
  'pickedIngridients/setBunTop'
);
export const addMainItem = createAction<TIngredient>(
  'pickedIngridients/addMainItem'
);
export const setBunBottom = createAction<TIngredient>(
  'pickedIngridients/setBunBottom'
);
export const clearBunTop = createAction('pickedIngridients/clearBunTop');

export const removeMainItem = createAction<TConstructorIngredient>(
  'pickedIngridients/removeMainItem'
);
export const clearBunBottom = createAction('pickedIngridients/clearBunBottom');

export const moveUpMainItem = createAction<TIngredient>(
  'pickedIngridients/moveUpMainItem'
);
export const moveDownMainItem = createAction(
  'pickedIngridients/moveDownMainItem'
);

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(setBunTop, (state, action) => {
        state.pickedIngridients.bunTop = action.payload;
      })
      .addCase(clearBunTop, (state) => {
        state.pickedIngridients.bunTop = null;
      })
      .addCase(addMainItem, (state, action) => {
        state.pickedIngridients.main = [
          ...state.pickedIngridients.main,
          { ...action.payload, id: uuidv4() }
        ];
      })
      .addCase(moveUpMainItem, (state, action) => {
        const tempItem = state.pickedIngridients.main.find(
          (element) => element._id === action.payload._id
        );
        console.log('action.payload: ' + action.payload._id);
        console.log('tempItem: ' + tempItem);
        if (tempItem) {
          const index = state.pickedIngridients.main.indexOf(tempItem);
          console.log('index: ' + index);
          if (index) {
            const newArray = [...state.pickedIngridients.main];
            const temp = newArray[index - 1];
            newArray[index - 1] = tempItem;
            newArray[index] = temp;
            state.pickedIngridients.main = newArray;
          }
        }
      })

      .addCase(removeMainItem, (state, action) => {
        const newArray = [...state.pickedIngridients.main].filter(
          (ele: TConstructorIngredient) => ele._id === action.payload._id
        );
        console.log('action.payload.id: ' + action.payload.id);
        newArray.forEach((e) =>
          console.log('state.pickedIngridients.main: ' + e.id)
        );
        ///////////////////////////////ДОДЕЛАТЬ УДАЛЕНИЕ А ТАК_ЖЕ ПЕРЕМЕЩЕНИЕ ОБЪЕКТОВ
        state.pickedIngridients.main = state.pickedIngridients.main.filter(
          (element) => {
            element.id != action.payload.id;
          }
        );
        // state.pickedIngridients.main = state.pickedIngridients.main.filter(
        //   (element) => {
        //     element._id !== action.payload._id;
      })
      .addCase(setBunBottom, (state, action) => {
        state.pickedIngridients.bunBottom = action.payload;
      })
      .addCase(clearBunBottom, (state) => {
        state.pickedIngridients.bunBottom = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredientList = action.payload;
        state.ingredients.buns = action.payload.filter(
          (ele: TIngredient) => ele.type === 'bun'
        );
        state.ingredients.sauces = action.payload.filter(
          (ele: TIngredient) => ele.type === 'sauce'
        );
        state.ingredients.mains = action.payload.filter(
          (ele: TIngredient) => ele.type === 'main'
        );
        state.ingredientsStatus = 'succeeded';
      })
      .addCase(fetchIngredients.pending, (state) => {
        state.ingredientsStatus = 'loading';
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.ingredientsStatus = 'failed';
      });
  }
});
