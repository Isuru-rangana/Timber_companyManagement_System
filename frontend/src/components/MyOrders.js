import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './header.css';
import './details.css';

function ConfirmOrder() {
  return (
    <div class="home-section">
      <h3>
        <b>- Shopping Cart -</b>
      </h3>
    </div>
  );
}

export default ConfirmOrder;
