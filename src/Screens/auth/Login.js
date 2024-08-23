import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/authAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../../Components/login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
      .then(() => {
        console.log("loginSucess")
        navigate('/');
      })
      .catch((error) => {
        console.error('Login failed:', error.message);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className={authError ? 'input-error' : ''}
            required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-input-container">
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className={authError ? 'input-error' : ''}
              required 
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>
        {authError && <div className="error-message">{authError}</div>}
        <button className="button-login" type="submit">Login</button>
      </form>
      <div className="signup-link">
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
