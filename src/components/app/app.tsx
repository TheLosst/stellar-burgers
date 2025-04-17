import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

import '../../index.css';
import styles from './app.module.css';
import ProtectedRoute from '../../utils/ProtectedRoute';

import { AppHeader, BurgerIngredients, OrderInfo } from '@components';
import { Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../services/store';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound404 />} />
          <Route path='/feed/:number' element={<OrderInfo />} />
          {/* <Route path='/ingredients/:id' element={<IngredientDetails(id) />} /> */}
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  </div>
);

export default App;
