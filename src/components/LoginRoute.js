import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const LoginRoute = ({ children }) => {
  const { user, token } = useAuthStore();
  if (token && user) {
    return <Navigate to={'/dashboard'} replace />;
  }

  return children ? children : <Outlet />;
};
