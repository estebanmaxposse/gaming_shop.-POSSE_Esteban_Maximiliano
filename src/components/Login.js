import { async } from "@firebase/util";
import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNotif } from "../contexts/NotifContext";
import Alerts from "./Alerts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setAlert, alert: {isAlert} } = useNotif();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const { login, loginGoogle } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/account");
    } catch (e) {
      setAlert({ isAlert: true, variant:'danger', message:e.message });
      console.log(e.message);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginGoogle();
      navigate("/account");
    } catch (e) {
      setAlert({ isAlert: true, variant:'danger', message:e.message });
      console.log(e.message);
    }
  }

  return (
    <div className="sign-in-bg">
      <div className="sign-in">
        <h1>Welcome back!</h1>
        {isAlert && <Alerts /> }
        <Form className="sign-in-form mb-3" onSubmit={handleLogin}>
          <Form.Label>Email address</Form.Label>
          <InputGroup className="mb-3 sign-in-input" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <Form.Label>Password</Form.Label>
          <InputGroup
            className="mb-3 sign-in-input"
            controlId="formBasicPassword"
          >
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              variant="secondary"
              className="passwordButton"
              onClick={handleClick}
              onMouseDown={handleMouseDown}
            >
              {showPassword ? (
                <i className="bi bi-eye-slash-fill"></i>
              ) : (
                <i className="bi bi-eye-fill"></i>
              )}
            </Button>
          </InputGroup>

          <Button variant="primary" type="submit" className="fullwidth-button">
            Login!
          </Button>

          <Button onClick={handleGoogleLogin}>
            <i className="bi bi-google"></i>
            Sign in with Google!
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
