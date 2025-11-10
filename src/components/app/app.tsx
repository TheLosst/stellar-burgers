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
  IngredientPage,
  OrderPage
} from '@pages';
import { AppHeader, IngredientModal, OrderModal, ReduxDemo } from '@components';

import '../../index.css';
import styles from './app.module.css';
import ProtectedRoute from '../../utils/ProtectedRoute';
import OnlyAuth from '../../utils/OnlyAuth';

import { Provider } from 'react-redux';
import store, { useDispatch, useSelector } from '../../services/store';
import { useEffect, useState } from 'react';
import { getUser } from '../../utils/user-slice';
import { fetchIngredients } from '../../utils/burger-slice';
import { Preloader } from '@ui';
import { getCookie } from '../../utils/cookie';

const AppRouter = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const [isInitialized, setIsInitialized] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const initApp = async () => {
      // Загружаем ингредиенты при старте приложения
      dispatch(fetchIngredients());

      // Проверяем авторизацию если есть токен в cookie или refreshToken в localStorage
      const accessToken = getCookie('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (accessToken || refreshToken) {
        await dispatch(getUser());
      }

      setIsInitialized(true);
    };

    initApp();
  }, [dispatch]);

  // Показываем прелоадер до инициализации
  if (!isInitialized) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <Preloader />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />

      {/* Основные роуты */}
      <Routes location={background || location}>
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

        {/* Страницы с деталями */}
        <Route path='/ingredients/:id' element={<IngredientPage />} />
        <Route path='/feed/:number' element={<OrderPage />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path='/not-found' element={<NotFound404 />} />
        <Route path='*' element={<Navigate to='/not-found' replace />} />
      </Routes>

      {/* Модальные окна показываются только при наличии background */}
      {background && (
        <Routes>
          <Route path='/ingredients/:id' element={<IngredientModal />} />
          <Route path='/feed/:number' element={<OrderModal />} />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <OrderModal />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
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
