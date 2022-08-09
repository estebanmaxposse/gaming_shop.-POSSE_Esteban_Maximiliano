import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { createUser } = UserAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="sign-in-bg">
      <div className="sign-in">
        <h1>Sign Up!</h1>
        <Form className="sign-in-form mb-3" onSubmit={handleSignUp}>
          <Form.Group className="mb-3 sign-in-input" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3 sign-in-input" controlId="formBasicEmail">
            <Form.Label>Confirm email</Form.Label>
            <Form.Control type="email" placeholder="Confirm email" />
          </Form.Group> */}

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

          {/* <Form.Group className="mb-3 sign-in-input" controlId="formBasicPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" />
          </Form.Group> */}

          <Button variant="primary" type="submit" className="fullwidth-button">
            Submit
          </Button>
        </Form>
        <p>
          Already have an account? <Link to="/login">Sign in!</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
