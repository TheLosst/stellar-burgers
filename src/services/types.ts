import {
  TConstructorIngredient,
  TIngredient,
  TUser,
  TOrder,
  TOrdersData
} from '@utils-types';

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
  state: {
    isAuthenticated: boolean;
    isLoading: boolean;
    loginError: string | null;
    registerError: string | null;
  };
};

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

export type TOrderState = {
  orders: TOrder[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  newOrder: {
    order: TOrder | null;
    name: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  orderDetails: {
    order: TOrder | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
};

export type TRootReducer = {
  burgerApi: TBurgerApiReducer;
  user: TUserState;
  feed: TFeedState;
  orders: TOrderState;
};
