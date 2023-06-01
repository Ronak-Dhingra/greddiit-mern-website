import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import api from '../api/api';
export default function Logout() {
    const nav = useNavigate();
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    // const dispatch = useDispatch();

    const handleLogout = () => {
      // localStorage.setItem('token', 'false');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['x-auth-token'];
      delete api.defaults.headers.common['x-auth-token'];
      // dispatch(logout());
      setIsLoggedOut(true);
    }
  
    if (isLoggedOut) {
      nav("/");
    }
  
    return (
      <button onClick={handleLogout}>
        Logout
      </button>
    );
}