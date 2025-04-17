import { TConstructorIngredient, TIngredient, TUser } from '@utils-types';

export type TBurgerApiReducer = {
  ingredients: {
    buns: Array<TIngredient>;
    mains: Array<TIngredient>;
    sauces: Array<TIngredient>;
  };
  ingredientList: Array<TIngredient>;
  ingredientsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
};

export type TUserState = TUser & {
  state: { isAuthenticated: boolean };
};

export type TRootReducer = { burgerApi: TBurgerApiReducer; user: TUserState };
