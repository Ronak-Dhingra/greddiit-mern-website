import React from 'react';
import './LoginRegister.css';
import logo from '../greddiit.png';

export default function Home() {
  return (
    <div className="LoginRegister">
      <div className="lander">
        <img src={logo} className="App-logo" alt="logo" />
        <br></br>
        <br></br>
        <h1>Greddiit</h1>
        <p className="text-muted">A Bomb Social Media Platform</p>
      </div>
    </div>
  );
}