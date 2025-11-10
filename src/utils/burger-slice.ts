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
  ingredientsError: null,
  pickedIngridients: pickedIngridientsInitialState
} satisfies TBurgerApiReducer as TBurgerApiReducer;

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIngredientsApi();
      return data;
    } catch (error: any) {
      // Преобразуем ошибку в сериализуемый объект
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const setBunTop = createAction<TIngredient>(
  'pickedIngridients/setBunTop'
);
export const addMainItem = createAction<TConstructorIngredient>(
  'pickedIngridients/addMainItem'
);

// Action creator для добавления ингредиента с UUID
export const addMainItemWithUuid = (ingredient: TIngredient) => {
  const ingredientWithUuid: TConstructorIngredient = {
    ...ingredient,
    id: uuidv4()
  };
  return addMainItem(ingredientWithUuid);
};
export const setBunBottom = createAction<TIngredient>(
  'pickedIngridients/setBunBottom'
);
export const clearBunTop = createAction('pickedIngridients/clearBunTop');

export const removeMainItem = createAction<TConstructorIngredient>(
  'pickedIngridients/removeMainItem'
);
export const clearBunBottom = createAction('pickedIngridients/clearBunBottom');

export const clearConstructor = createAction(
  'pickedIngridients/clearConstructor'
);

export const moveUpMainItem = createAction<TConstructorIngredient>(
  'pickedIngridients/moveUpMainItem'
);
export const moveDownMainItem = createAction<TConstructorIngredient>(
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
          action.payload
        ];
      })
      .addCase(moveUpMainItem, (state, action) => {
        const index = state.pickedIngridients.main.findIndex(
          (element) => element.id === action.payload.id
        );
        if (index > 0) {
          const newArray = [...state.pickedIngridients.main];
          const temp = newArray[index - 1];
          newArray[index - 1] = newArray[index];
          newArray[index] = temp;
          state.pickedIngridients.main = newArray;
        }
      })
      .addCase(moveDownMainItem, (state, action) => {
        const index = state.pickedIngridients.main.findIndex(
          (element) => element.id === action.payload.id
        );
        if (index < state.pickedIngridients.main.length - 1) {
          const newArray = [...state.pickedIngridients.main];
          const temp = newArray[index + 1];
          newArray[index + 1] = newArray[index];
          newArray[index] = temp;
          state.pickedIngridients.main = newArray;
        }
      })

      .addCase(removeMainItem, (state, action) => {
        state.pickedIngridients.main = state.pickedIngridients.main.filter(
          (element) => element.id !== action.payload.id
        );
      })
      .addCase(setBunBottom, (state, action) => {
        state.pickedIngridients.bunBottom = action.payload;
      })
      .addCase(clearBunBottom, (state) => {
        state.pickedIngridients.bunBottom = null;
      })
      .addCase(clearConstructor, (state) => {
        state.pickedIngridients = pickedIngridientsInitialState;
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
        state.ingredientsError = null;
      })
      .addCase(fetchIngredients.pending, (state) => {
        state.ingredientsStatus = 'loading';
        state.ingredientsError = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.ingredientsStatus = 'failed';
        state.ingredientsError = action.payload as string;
      });
  }
});
