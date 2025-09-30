import { RootState } from '../services/store';

// Селекторы для ингредиентов
export const selectIngredients = (state: RootState) =>
  state.burgerApi.ingredients;
export const selectIngredientList = (state: RootState) =>
  state.burgerApi.ingredientList;
export const selectIngredientsStatus = (state: RootState) =>
  state.burgerApi.ingredientsStatus;
export const selectPickedIngredients = (state: RootState) =>
  state.burgerApi.pickedIngridients;

// Селекторы для пользователя
export const selectUser = (state: RootState) => state.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.user.state.isAuthenticated;
export const selectUserLoading = (state: RootState) =>
  state.user.state.isLoading;
export const selectLoginError = (state: RootState) =>
  state.user.state.loginError;
export const selectRegisterError = (state: RootState) =>
  state.user.state.registerError;

// Селекторы для ленты заказов
export const selectFeed = (state: RootState) => state.feed;
export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedTotal = (state: RootState) => state.feed.total;
export const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;
export const selectFeedStatus = (state: RootState) => state.feed.status;
export const selectFeedError = (state: RootState) => state.feed.error;

// Селекторы для заказов
export const selectOrders = (state: RootState) => state.orders;
export const selectUserOrders = (state: RootState) => state.orders.orders;
export const selectOrdersStatus = (state: RootState) => state.orders.status;
export const selectOrdersError = (state: RootState) => state.orders.error;

// Селекторы для нового заказа
export const selectNewOrder = (state: RootState) => state.orders.newOrder;
export const selectNewOrderStatus = (state: RootState) =>
  state.orders.newOrder.status;
export const selectNewOrderError = (state: RootState) =>
  state.orders.newOrder.error;

// Селекторы для деталей заказа
export const selectOrderDetails = (state: RootState) =>
  state.orders.orderDetails;
export const selectOrderDetailsStatus = (state: RootState) =>
  state.orders.orderDetails.status;
export const selectOrderDetailsError = (state: RootState) =>
  state.orders.orderDetails.error;
