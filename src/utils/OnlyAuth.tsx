import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { TRootReducer } from 'src/services/types';
import { getUser } from './user-slice';
import { AppDispatch } from '../services/store';

// Компонент для маршрутов, доступных только НЕавторизованным пользователям
const OnlyAuth = ({ children }: { children: ReactElement }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: TRootReducer) => state.user);
  const location = useLocation();

  useEffect(() => {
    // Проверяем токен при загрузке
    if (localStorage.getItem('accessToken') && !user.state.isAuthenticated) {
      dispatch(getUser());
    }
  }, [dispatch, user.state.isAuthenticated]);

  // Если загружаем данные пользователя
  if (user.state.isLoading) {
    return <div>Загрузка...</div>;
  }

  // Если пользователь авторизован, перенаправляем назад или на главную
  if (user.state.isAuthenticated) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return children;
};

export default OnlyAuth;
