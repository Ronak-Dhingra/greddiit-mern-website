import React, { useState } from "react";
import './App.css';
import Routes from "./Routes";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Register from "./containers/Register";
import LoginRegistration from "./containers/LoginRegister";
import Profile from "./containers/Profile";
import './containers/Navbar.css'

function App() {
  // const user = useSelector(selectUser);
  return (
    <div className="App container">
      <Routes />
    </div>
  );
}

export default App;
