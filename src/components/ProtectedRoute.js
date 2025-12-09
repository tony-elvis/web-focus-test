import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const ProtectedRoute = ({ children }) => {
  const { user, token } = useAuthStore();
  if (!token && !user) {
    return <Navigate to={'/'} replace />;
  }

  return children ? children : <Outlet />;
};
