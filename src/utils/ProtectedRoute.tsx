import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  // Если пользователь не авторизован
  if (!user.state.isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
