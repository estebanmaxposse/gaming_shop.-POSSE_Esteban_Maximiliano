import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const navigate = useNavigate();

  const { signUp, setLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPassword = () => {
    setShowConfirmedPassword(!showConfirmedPassword);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (password !== confirmedPassword) {
        throw new Error("Passwords don't match!");
      }
      await signUp(email, password);
      toast.success("Signed up!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      });
      toast.onChange(payload => {
        if (payload.status === "removed" && payload.type === toast.TYPE.SUCCESS) {
          navigate("/account");
        }
      });
    } catch (e) {
      toast.error(e.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000
      });
      console.log(e.message);
    };
    setLoading(false);
  };

  return (
    <div className="sign-in-bg">
      <ToastContainer />
      <div className="sign-in">
        <h1>Sign Up!</h1>
        <Form className="sign-in-form mb-3" onSubmit={handleSignUp}>
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
              onClick={handlePassword}
              onMouseDown={handleMouseDown}
            >
              {showPassword ? (
                <i className="bi bi-eye-slash-fill"></i>
              ) : (
                <i className="bi bi-eye-fill"></i>
              )}
            </Button>
          </InputGroup>

          <Form.Label>Confirm Password</Form.Label>
          <InputGroup
            className="mb-3 sign-in-input"
            controlId="formConfirmPassword"
          >
            <Form.Control
              type={showConfirmedPassword ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmedPassword(e.target.value)}
              required
            />
            <Button
              variant="secondary"
              className="passwordButton"
              onClick={handleConfirmPassword}
              onMouseDown={handleMouseDown}
            >
              {showConfirmedPassword ? (
                <i className="bi bi-eye-slash-fill"></i>
              ) : (
                <i className="bi bi-eye-fill"></i>
              )}
            </Button>
          </InputGroup>

          <Button variant="primary" type="submit" className="fullwidth-button">
            Sign Up!
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
