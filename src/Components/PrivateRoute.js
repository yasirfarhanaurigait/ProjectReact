import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({  children, isAuthenticated }) => {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  return auth ? (
    <Outlet/>
  ) : (
    <Navigate to="/login" />
  );
};
export const RedirectIfAuthenticated = ({ children }) => {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  console.log("authState",auth)

  return auth ? <Navigate to="/" /> : children;
};

export default PrivateRoute;