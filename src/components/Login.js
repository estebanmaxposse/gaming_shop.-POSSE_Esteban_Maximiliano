import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { signIn } = UserAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/account');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="sign-in-bg">
      <div className="sign-in">
        <h1>Welcome back!</h1>
        <Form className="sign-in-form mb-3" onSubmit={handleLogin}>
          <Form.Group className="mb-3 sign-in-input" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            className="mb-3 sign-in-input"
            controlId="formBasicPassword"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="fullwidth-button">
            Submit
          </Button>
        </Form>
        <p>
          Don't have an account? <Link to="/signUp">Sign up!</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
