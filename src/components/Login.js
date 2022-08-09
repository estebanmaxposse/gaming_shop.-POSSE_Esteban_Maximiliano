import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="sign-in-bg">
      <div className="sign-in">
        <h1>Welcome back!</h1>
        <Form className="sign-in-form mb-3">
          <Form.Group className="mb-3 sign-in-input" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3 sign-in-input" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit" className="fullwidth-button">
            Submit
          </Button>
        </Form>
        <p>Don't have an account? <Link to="/signUp">Sign up!</Link></p>
      </div>
    </div>
  );
};

export default Login;
