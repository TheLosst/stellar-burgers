import { TConstructorIngredient, TIngredient, TUser } from '@utils-types';

export type TBurgerApiReducer = {
  ingredients: Array<TIngredient>;
  ingredientsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
};

export type TUserState = TUser & {
  state: { isAuthenticated: boolean };
};

export type TRootReducer = { burgerApi: TBurgerApiReducer; user: TUserState };
