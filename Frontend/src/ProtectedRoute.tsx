// src/components/ProtectedRoute.tsx
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setLoaderAction } from './redux/user/userSlice';
import { ring } from 'ldrs';

// interface ProtectedRouteProps extends PathRouteProps {
//   children: React.ReactNode;
// }

const ProtectedRoute = () => {
  ring.register()
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
    }
  }, [loading, isAuthenticated, cookie, dispatch, route])

  if (loading) return <>
    <div className='text-center h-full w-full absolute flex justify-center items-center backdrop-blur-[2px] bottom-1 z-50'>
      <l-ring
        size="40"
        stroke="5"
        bg-opacity="0"
        speed="2"
        color="black"
      ></l-ring>
    </div>
  </>

  return (isAuthenticated && (
    <Outlet />
  ))
};

export default ProtectedRoute;