import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { TRootReducer } from 'src/services/types';

const OnlyUnAuth = ({ children }: { children: ReactElement }) => {
  const user = useSelector((state: TRootReducer) => state.user);
  const location = useLocation();

  if (user.state.isAuthenticated) {
    // Если пользователь авторизован, перенаправляем на главную или на страницу, откуда пришел
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }
  return children;
};

export default OnlyUnAuth;
