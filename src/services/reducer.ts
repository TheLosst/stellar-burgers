import { combineReducers } from 'redux';
import { burgerSlice } from '../utils/burger-slice';
import userReducer from '../utils/user-slice';
import feedReducer from '../utils/feed-slice';
import ordersReducer from '../utils/orders-slice';

const rootReducer = combineReducers({
  burgerApi: burgerSlice.reducer,
  user: userReducer,
  feed: feedReducer,
  orders: ordersReducer
});

export default rootReducer;
