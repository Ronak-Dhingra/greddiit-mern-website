import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import { login, logout } from "../features/userSlice";
// import { useDispatch } from "react-redux";
import axios from "axios";
import Protected from "./Protected";
import api from "../api/api";

export const Login = () => {
    const nav = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [token, setToken] = useState(localStorage.getItem('token'));
    
    // useEffect(() => {
    //     // localStorage.clear();
    //     console.log(localStorage.getItem('token'));
    //     if (localStorage.getItem('token') === 'true') {
    //         // localStorage.setItem('token', 'false');
    //         nav("/profile");
    //     }
    // }, []);

  function handleLogin(token) {
    // setToken(token);
    localStorage.setItem('token', 'true');
    // setIsLoggedIn(true);
  }

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    // const dispatch = useDispatch();

    async function handleSubmit(event) {
        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        // dispatch(login({
        //     username: username,
        //     password: password,
        //     loggedIn: true,
        // }));
        try {
            const response = await axios.post('/api/auth/login', {
                uname: username,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    }
                    });
            alert("Login successful");
            console.log("Login successful");
            localStorage.setItem('token', 'true');
            localStorage.setItem('authToken', response.data.token);
            axios.defaults.headers.common['x-auth-token'] = response.data.token;
            api.defaults.headers.common['x-auth-token'] = response.data.token;
            
            nav("/profile");
        } catch (error) {
            console.log(error);
        }
        // console.log("testing");
        // if (username == "admin" && password == "admin") {
        //     alert("Login successful");
        //     console.log("Login successful");
        //     localStorage.setItem('token', 'true');
        //     nav("/profile");
        // }
        // else {
        //     alert("Login failed");
        // }
    }

    return (
        <div className="Login">
            <Home/>
            <center><h1 >Login</h1></center>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <br></br>
                <Button onClick={()=>handleLogin('example_token')} block="true" size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );
}