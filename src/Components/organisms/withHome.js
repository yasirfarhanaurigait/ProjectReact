import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

const withHomeLayout = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
      props.setIsAuthenticated(false);
      navigate('/login');
    };

    return (
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="active">Home</Link>
          <Link to="/users">Users</Link>
          <Link to="/blogs">Blogs</Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
        <div className="content">
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };
};

export default withHomeLayout;
