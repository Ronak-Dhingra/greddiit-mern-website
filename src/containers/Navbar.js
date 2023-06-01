import React from 'react';
import './Navbar.css';
import { FaHome, FaUserAlt, FaRedditAlien, FaCreativeCommonsBy, FaFly, FaHubspot, FaRust} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
export default function Navbar() {
  const loc = useLocation()
  const sg_path = loc.pathname.includes('showsubgreddiit')
  return (
    <div className="navbar">
      <a href="/profile" className="navbar-item">
        <FaUserAlt className="navbar-icon" />
        <span>Profile</span>
      </a>
      <a href="/mysubgreddiits" className="navbar-item">
        <FaRedditAlien className="navbar-icon" />
        <span>My SubGreddiits Page</span>
      </a>
      {sg_path && 
      <>
      <a href="/users" className="navbar-item">
        <FaCreativeCommonsBy className="navbar-icon" />
        <span>Users</span>
      </a>
      <a href="/joining" className="navbar-item">
        <FaFly className="navbar-icon" />
        <span>Joining Requests</span>
      </a>
      <a href="/stats" className="navbar-item">
        <FaHubspot className="navbar-icon" />
        <span>Stats</span>
      </a>
      <a href="/reported" className="navbar-item">
        <FaRust className="navbar-icon" />
        <span>Reported</span>
      </a>
      </>
      }
      <a href="/" className="navbar-item">
        <FaHome className="navbar-icon" />
        <span>Logout</span>
      </a>
    </div>
  );
}