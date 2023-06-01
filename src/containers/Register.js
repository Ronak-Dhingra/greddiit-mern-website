import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useFormFields } from "../lib/hooks";
import LoaderButton from "./LoaderButton";
import "./Register.css";
import Home from "./Home";
import {Login} from "./Login";
import axios from "axios";
import LoginRegistration from "./LoginRegister";
import api from "../api/api";

export default function Register() {
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    username: "",
    email: "",
    age: "",
    contact: "",
    password: "",
    confirmationCode: "",
  });
  const nav = useNavigate();
  const [newUser, setNewUser] = useState(null);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', {
      fname: fields.fname,
      lname: fields.lname,
      uname: fields.username,
      email: fields.email,
      age: fields.age,
      contact: fields.contact,
      password: fields.password,
    });
      alert("Registration successful");
      console.log("Registration successful");
      localStorage.setItem('token', 'true');
      localStorage.setItem('authToken', response.data.token);
      axios.defaults.headers.common['x-auth-token'] = response.data.token;
      api.defaults.headers.common['x-auth-token'] = response.data.token;
      // nav("/");
      nav("/profile");
    }
    catch (error) {
      console.log(error);
    }
    // setLoadingStatus(true);
    // setNewUser("test");
    // setLoadingStatus(false);
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    console.log("attempting to register");
    // setLoadingStatus(true);
    // AuthDone(true);
    // nav("/");
    <Login/>
  }

  // function renderConfirmationForm() {
  //   return (
  //     <div className="Signup">
  //       <Form name="Signup" onSubmit={handleConfirmationSubmit}>
  //         <Form.Group controlId="confirmationCode" size="lg">
  //           <Form.Label>Confirmation Code, after verifying click on "Choose other mode" to redirect to login </Form.Label>
  //           <Form.Control
  //             autoFocus
  //             type="tel"
  //             onChange={handleFieldChange}
  //           />
  //           <Form.Text>Please check your email for the code.</Form.Text>
  //         </Form.Group>
  //         <LoaderButton
  //           block
  //           size="lg"
  //           type="submit"
  //           // LoadingStatus={LoadingStatus}
  //           disabled={!validateForm()}
  //         >
  //           Verify
  //         </LoaderButton>
  //       </Form>
  //     </div>
  //   );
  //   }

  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
      <center><h1 >Register</h1></center>

        <Form.Group controlId="fname" size="lg">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.fname}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="lname" size="lg">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.lname}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="username" size="lg">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.username}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="age" size="lg">
          <Form.Label>Age</Form.Label>
          <Form.Control
            autoFocus
            type="number"
            value={fields.age}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="contact" size="lg">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            autoFocus
            type="number"
            value={fields.contact}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            autoFocus
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <br></br>
        <LoaderButton
          block="true"
          size="lg"
          type="submit"
          variant="success"
        //   LoadingStatus={LoadingStatus}
          disabled={!validateForm()}
        >
          Register
        </LoaderButton>
      </Form>
    );
  }

  return (
    <div className="Signup">
        <Home/>
        {/* {newUser == null ? renderForm() : renderConfirmationForm()} */}
        {renderForm()}
    </div>
  );
}