import { combineReducers } from 'redux';
import { burgerSlice } from '../utils/burger-slice';
import userReducer from '../utils/user-slice';

const rootReducer = combineReducers({
  burgerApi: burgerSlice.reducer,
  user: userReducer
});

export default rootReducer;
