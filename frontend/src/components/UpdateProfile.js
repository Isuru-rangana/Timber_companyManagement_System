import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './details.css';
import { background, colors } from 'plotly.js/dist/plotly-cartesian';

function UpdateProfile() {
  const { state } = useLocation();

  const [id, setCustomerId] = useState(`${state.id}`);
  const [CustomerName, setCustomerName] = useState(`${state.CustomerName}`);
  const [Email, setEmail] = useState(`${state.Email}`);
  const [ContactNo, setContactNo] = useState(`${state.ContactNo}`);
  const [Address, setAddress] = useState(`${state.Address}`);
  const [Password, setPassword] = useState(`${state.Password}`);

  const [showPassword, setShowPassword] = useState(false);

  function updateData(e) {
    e.preventDefault();

    const newCustomer = {
      CustomerName,
      Email,
      ContactNo,
      Address,
    };

    alert(Password);

    axios
      .put(`http://localhost:8070/customer/update/${id}`, newCustomer)
      .then(() => {
        alert('Customer updated');
      })
      .catch((err) => {
        alert(err);
      });

    const newLogin = {
      Email,
      Password,
    };

    axios
      .put(`http://localhost:8070/login/update/${id}`, newLogin)
      .then(() => {
      })
      .catch((err) => {
        alert(err);
      });
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="home-section">
      <h1 className="form_head">- Update Customer Details -</h1>
      <form class="formContent" onSubmit={updateData}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Customer Name
          </label>
          <br />
          <input
            type="text"
            class="formInput"
            value={CustomerName}
            required
            onChange={(e) => {
              setCustomerName(e.target.value);
            }}
          />
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Email
          </label>
          <br />
          <input
            type="email"
            readOnly={true}
            class="formInput"
            value={Email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Contact No
          </label>
          <br />
          <input
            type="text"
            class="formInput"
            value={ContactNo}
            required
            maxLength="10"
            pattern="[0]{1}[0-9]{9}"
            onChange={(e) => {
              setContactNo(e.target.value);
            }}
          />
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Address
          </label>
          <br />
          <input
            type="text"
            class="formInput"
            value={Address}
            required
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>

        <div style={{ marginTop: '80px'}}>
        <Link to="/profile" className="backBtn">
          Back to Profile
        </Link>
        <button type="submit" className="updateBtn">
          Update Profile
        </button></div>
      </form>
    </div>
  );
}

export default UpdateProfile;