import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { TRootReducer } from 'src/services/types';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const user = useSelector((state: TRootReducer) => state.user);
  let location = useLocation();

  if (!user.state.isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
