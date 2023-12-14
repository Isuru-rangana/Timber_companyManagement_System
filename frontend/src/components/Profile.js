import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import './details.css';
import './header.css';
import './signup.css';
import CustomerHeader from './CustomerHeader';
import App from '../App';

function Profile() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({});

  const [password, setPassword] = useState('');

  const getEmail = localStorage.getItem('emailData'); //local storage user

  function getCustomer() {
    axios
      .get(`http://localhost:8070/customer/profile/${getEmail}`)
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function getPassword() {
    axios
      .get(`http://localhost:8070/login/${getEmail}`)
      .then((res) => {
        setPassword(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    getCustomer();
    getPassword();
  }, []);

  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div class="home-section">
      <h2 className="form_head" style={{ marginLeft: '310px' }}>
        _.Customer Profile._
      </h2>

      <table className='profile_table'>
        <tbody>
          <tr>
            <td>Name</td>
            <td>:</td>
            <td className="value">{customer.CustomerName}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>:</td>
            <td className="value">{customer.Email}</td>
          </tr>
          <tr>
            <td>Contact No</td>
            <td>:</td>
            <td className="value">{customer.ContactNo}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>:</td>
            <td className="value">{customer.Address}</td>
          </tr>
        </tbody>
      </table>
      <div className="profileButtons">
        <button className="backBtn" onClick={handleClick}>
          Logout
        </button>

        <button
          onClick={() => {
            navigate('/updateProfile', {
              state: {
                id: `${customer._id}`,
                CustomerName: `${customer.CustomerName}`,
                Email: `${customer.Email}`,
                ContactNo: `${customer.ContactNo}`,
                Address: `${customer.Address}`,
                Password: `${password}`,
              },
            });
          }}
          className="updateBtn"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;