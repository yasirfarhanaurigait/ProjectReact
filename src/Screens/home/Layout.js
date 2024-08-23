import React ,{useState,useEffect} from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/authAction';
import avatarPlaceholder from '../../assets/avtar.png'; 
import '../../Components/styles.css';

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('name');
    localStorage.removeItem('email');

    setName('');
    setEmail('');
    navigate('/login');
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const storedName = localStorage.getItem('name');
      const storedEmail = localStorage.getItem('email');

      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
    }, 2000); 

  
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="user-info">
          <img src={avatarPlaceholder} alt="User Avatar" className="avatar" />
          <div className="welcome-message">
            <span>Welcome, {name}!</span>
            <span className="email">{email}</span>
          </div>
        </div>
        <nav className="navbar">
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          <NavLink to="/users" className={({ isActive }) => isActive ? "active" : ""}>Users</NavLink>
          <NavLink to="/blogs" className={({ isActive }) => isActive ? "active" : ""}>Blogs</NavLink>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
