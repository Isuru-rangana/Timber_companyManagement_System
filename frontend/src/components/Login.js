import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import './header.css';
import google from '../images/google.png';
import Profile from './Profile';

function Login() {
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL_2}/auth/google/callback`,
      '_self'
    );
  };

  const getEmail = localStorage.getItem('emailData');

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [pwd, setPwd] = useState('');
  const [customer, setCustomer] = useState([]);

  function validateLogin() {
    axios
      .get(`http://localhost:8070/login/${Email}`, { timeout: 900 })
      .then((res) => {
        setPwd(res.data);
        if (Password === res.data) {
          localStorage.setItem('emailData', `${Email}`);
          alert('Login Successfull');
          window.location.reload();
        } else {
          alert('Please enter correct Password');
        }
      })
      .catch((err) => {
        if (err.code === 'ECONNABORTED') {
          alert('Please enter valid Email and Password.');
        } else {
          alert('Please enter Email and Password.');
        }
      });
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="home-section">
      <h1 className="head"></h1>
      {getEmail ? (
        <Profile />
      ) : (
        <div className="form_content">
          <div className="login">
            <h2 className="from_heading">_. User Log in ._</h2>
            <input
              type="text"
              className="input"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <input
              type={showPassword ? 'text' : 'password'}
              className="input"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span onClick={toggleShowPassword}>
              {' '}
              {showPassword ? 'Hide Password' : 'Show Password'}
            </span>
            <br />

            <button className="btn" onClick={validateLogin}>
              Log In
            </button>

            <p className="text">or</p>

            <button className="google_btn" onClick={googleAuth}>
              <img src={google} alt="google icon" />
              <span>Sign in with Google</span>
            </button>

            <p className="text">
              New Here ? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;