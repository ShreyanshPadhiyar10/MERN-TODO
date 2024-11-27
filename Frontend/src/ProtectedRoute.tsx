// src/components/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { Navigate, PathRouteProps, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setLoaderAction } from './redux/user/userSlice';

interface ProtectedRouteProps extends PathRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user: isAuthenticated, loading } = useAuth();
  const route = useNavigate()
  const cookie = document.cookie
  const dispatch = useDispatch()

  useEffect(() => {
    if (!cookie) {
      dispatch(setLoaderAction(false))
    }
    if (!isAuthenticated && !loading) {
      route("/login")
    } else {
      route("/todo")
    }
  }, [loading, isAuthenticated, cookie, dispatch, route])

  if (loading) return <>Loading....</>

  return (isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace />
  ))
};

export default ProtectedRoute;