import React ,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Components/styles.css';
import Login from './Screens/auth/Login';
import HomeWithLoading from './Screens/home/Home';
import { AppProvider } from './Components/AppContext'; 
import UserComponent from './Components/organisms/UserComponent'; 
import BlogComponent from './Components/organisms/BlogComponent'; 
import ErrorBoundary from './Components/organisms/ErrorBoundary';
import { login, logout } from './store/actions/authAction';
import Signup from './Screens/auth/Signup'
import PrivateRoute, { RedirectIfAuthenticated } from './Components/PrivateRoute';
import Cookies from 'js-cookie';
import { setAuthenticated } from '../src/store/actions/authAction';
import Layout from './Screens/home/Layout';
import BlogDetail from './Screens/home/BlogDetail';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
   
    const token = Cookies.get('userToken');
    if (token) {
   
      dispatch(setAuthenticated(true));
    }
  }, [dispatch]);

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  console.log("token",isAuthenticated);
  return (
    <AppProvider>
      <ErrorBoundary>
        <Router>
          <div className="App">
            <Routes>
            <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route element={<Layout />}>
              <Route index element={<HomeWithLoading />} />
              <Route path="/users" element={<UserComponent />} />
              <Route path="/blogs" element={<BlogComponent />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
            </Route>
          </Route>
                <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />
                <Route path="/signup" element={ <RedirectIfAuthenticated><Signup /></RedirectIfAuthenticated>} />
              </Routes>
          </div>
        </Router>
      </ErrorBoundary>
    </AppProvider>
  );
};

export default App;
