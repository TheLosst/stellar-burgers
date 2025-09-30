import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { TRootReducer } from 'src/services/types';
import { getUser } from './user-slice';
import { AppDispatch } from '../services/store';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: TRootReducer) => state.user);
  const location = useLocation();

  useEffect(() => {
    // Проверяем токен при загрузке защищенного маршрута
    if (localStorage.getItem('accessToken') && !user.state.isAuthenticated) {
      dispatch(getUser());
    }
  }, [dispatch, user.state.isAuthenticated]);

  // Если загружаем данные пользователя
  if (user.state.isLoading) {
    return <div>Загрузка...</div>;
  }

  // Если пользователь не авторизован
  if (!user.state.isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
