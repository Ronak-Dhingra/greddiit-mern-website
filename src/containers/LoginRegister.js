// import React from 'react';
// import './LoginRegister.css';
// import Login from './Login';
// import logo from '../greddiit.png';

// export default function LoginRegister() {
//   return (
//     <div className="LoginRegister">
//       <div className="lander">
//         <img src={logo} className="App-logo" alt="logo" />
//         <br></br>
//         <br></br>
//         <h1>Greddiit</h1>
//         <p className="text-muted">A Bomb Social Media Platform</p>
//       <Login />
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
import "./LoginRegister.css";
import {Login} from "./Login";
import Register from "./Register";

export default function LoginRegistration() {
    const [form, setForm] = useState("form1");
  
    const handleToggle = () => {
      setForm(form === "form1" ? "form2" : "form1");
    }
  
    return (
      <div>
        {form === "form1" ? <Login /> : <Register />}
        <button onClick={handleToggle}>Choose other mode</button>
        <br></br>
      </div>
    );
  }