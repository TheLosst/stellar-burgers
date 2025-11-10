import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';

const OnlyUnAuth = ({ children }: { children: ReactElement }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  if (user.state.isAuthenticated) {
    // Если пользователь авторизован, перенаправляем на главную или на страницу, откуда пришел
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }
  return children;
};

export default OnlyUnAuth;
