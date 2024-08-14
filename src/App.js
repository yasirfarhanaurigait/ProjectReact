import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Components/styles.css';
import Login from './Screens/auth/Login';
import Home from './Screens/home/Home';
import { AppProvider } from './Components/AppContext'; // Adjust the import path as needed
import ErrorBoundary from './Components/organisms/ErrorBoundary';
import { loginSuccess, logout } from './store/actions/authAction';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginSuccess());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppProvider>
      <ErrorBoundary>
        <Router>
          <div className="App">
            <Routes>
                <Route path="/*" element={<Home setIsAuthenticated={handleLogout} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
          </div>
        </Router>
      </ErrorBoundary>
    </AppProvider>
  );
};

export default App;
