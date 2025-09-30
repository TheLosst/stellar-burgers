import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
} from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404,
  IngredientPage
} from '@pages';
import { AppHeader, IngredientModal, OrderModal, ReduxDemo } from '@components';

import '../../index.css';
import styles from './app.module.css';
import ProtectedRoute from '../../utils/ProtectedRoute';
import OnlyAuth from '../../utils/OnlyAuth';

import { Provider } from 'react-redux';
import store, { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getUser } from '../../utils/user-slice';
import { AppDispatch } from '../../services/store';
import { fetchIngredients } from '../../utils/burger-slice';

// Компонент для модальных окон
const ModalRoutes = () => {
  const location = useLocation();

  // Показываем модальные окна если есть background в state
  const showModal = location.state?.background;

  if (!showModal) return null;

  return (
    <>
      {location.pathname.includes('/feed/') &&
        location.pathname.match(/\/feed\/\d+$/) && <OrderModal />}
      {location.pathname.includes('/profile/orders/') &&
        location.pathname.match(/\/profile\/orders\/\d+$/) && (
          <ProtectedRoute>
            <OrderModal />
          </ProtectedRoute>
        )}
      {location.pathname.includes('/ingredients/') &&
        location.pathname.match(/\/ingredients\/[^/]+$/) && <IngredientModal />}
    </>
  );
};

const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Загружаем ингредиенты при старте приложения
    dispatch(fetchIngredients());

    // Проверяем авторизацию если есть токен
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        {/* Основные роуты */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/redux-demo' element={<ReduxDemo />} />

        {/* Роуты для неавторизованных пользователей */}
        <Route
          path='/login'
          element={
            <OnlyAuth>
              <Login />
            </OnlyAuth>
          }
        />
        <Route
          path='/register'
          element={
            <OnlyAuth>
              <Register />
            </OnlyAuth>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <OnlyAuth>
              <ForgotPassword />
            </OnlyAuth>
          }
        />
        <Route
          path='/reset-password'
          element={
            <OnlyAuth>
              <ResetPassword />
            </OnlyAuth>
          }
        />

        {/* Защищенные роуты */}
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

        {/* Ингредиенты */}
        <Route path='/ingredients/:id' element={<IngredientPage />} />

        {/* Модальные роуты для заказов */}
        <Route path='/feed/:number' element={<Feed />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path='/not-found' element={<NotFound404 />} />
        <Route path='*' element={<Navigate to='/not-found' replace />} />
      </Routes>

      {/* Модальные окна отображаются условно */}
      <ModalRoutes />
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AppRouter />
    </Router>
  </Provider>
);

export default App;
