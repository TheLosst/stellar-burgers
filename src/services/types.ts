import { TConstructorIngredient, TIngredient, TUser } from '@utils-types';

export type TPickedIngridients = {
  bunTop: TIngredient | null | undefined;
  main: TConstructorIngredient[];
  bunBottom: TIngredient | null | undefined;
};

export type TBurgerApiReducer = {
  ingredients: {
    buns: Array<TIngredient>;
    mains: Array<TIngredient>;
    sauces: Array<TIngredient>;
  };
  ingredientList: Array<TIngredient>;
  ingredientsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  pickedIngridients: TPickedIngridients;
};

export type TUserState = TUser & {
  state: { isAuthenticated: boolean };
};

export type TRootReducer = { burgerApi: TBurgerApiReducer; user: TUserState };
