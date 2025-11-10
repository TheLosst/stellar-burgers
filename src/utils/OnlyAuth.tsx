import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';

// Компонент для маршрутов, доступных только НЕавторизованным пользователям
const OnlyAuth = ({ children }: { children: ReactElement }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  // Если пользователь авторизован, перенаправляем назад или на главную
  if (user.state.isAuthenticated) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return children;
};

export default OnlyAuth;
