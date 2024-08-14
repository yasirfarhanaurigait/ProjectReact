import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../../Components/login.css';
import { loginSuccess } from '../../store/actions/authAction';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (email !== 'yasir@gmail.com') {
      setEmailError('Invalid email');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password !== 'Test@123') {
      setPasswordError('Invalid password');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      dispatch(loginSuccess());
      setIsAuthenticated(true);
      navigate('/');
      console.log("login success");
    }
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
            className={emailError ? 'input-error' : ''}
            title={emailError}
            required 
          />
          {emailError && <div className="error-message">{emailError}</div>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-input-container">
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className={passwordError ? 'input-error' : ''}
              title={passwordError}
              required 
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          {passwordError && <div className="error-message">{passwordError}</div>}
        </div>
        <button className="button-login" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
