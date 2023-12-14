import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';
import './header.css';
import google from '../images/google.png';

function Signup() {
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL_2}/auth/google/callback`,
      '_self'
    );
  };

  const navigate = useNavigate();

  const [CustomerName, setName] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [Address, setAddress] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function sendData(e) {
    e.preventDefault();

    const newCustomer = {
      CustomerName,
      Email,
      ContactNo,
      Address,
    };

    const newLogin = {
      Email,
      Password,
    };

    axios.post('http://localhost:8070/login/add', newLogin);
    axios
      .post('http://localhost:8070/customer/add', newCustomer)
      .then(() => {
        alert('successfully registered the customer');
        navigate('/login');
      })
      .catch((err) => {
        alert(err);
      });
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div class="home-section">
      <h1 className="head"></h1>
      <form class="customerform" onSubmit={sendData}>
        <div className="form_container">
          <div className="signup">
            <h2 className="from_heading">_. New User Sign up ._</h2>

            <input
              type="text"
              className="input"
              placeholder="Your Name"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <input
              type="tel"
              className="input"
              placeholder="Your ContactNo"
              maxLength="10"
              pattern="[0]{1}[0-9]{9}"
              required
              onChange={(e) => {
                setContactNo(e.target.value);
              }}
            />
            <br />
            <input
              type="text"
              className="input"
              placeholder="Your Address"
              required
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <br />
            <input
              type="email"
              className="input"
              placeholder="Your E-mail"
              required
              
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <input
              type={showPassword ? 'text' : 'password'}
              className="input"
              placeholder="Enter Password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span onClick={toggleShowPassword}>
              {' '}
              {showPassword ? 'Hide Password' : 'Show Password'}
            </span>
            <br />

            <button className="btn">Sign Up</button>

            <p className="text">or</p>
            <button className="google_btn" onClick={googleAuth}>
              <img src={google} alt="google icon" />
              <span>Sign up with Google</span>
            </button>
            <p className="text">
              Already Have Account ? <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;