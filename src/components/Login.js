import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCartContext } from "../contexts/CartContext";
import Alerts from "./Alerts";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [isAlert, setIsAlert] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const { login, setLoading } = useAuth();
  const { initialCart } = useCartContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      await initialCart();
      toast.success("Signed In!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      toast.onChange((payload) => {
        if (
          payload.status === "removed" &&
          payload.type === toast.TYPE.SUCCESS
        ) {
          navigate("/account");
        }
      });
    } catch (e) {
      setIsAlert(true);
      setError(e.message);
      console.log(e.message);
    }
    setLoading(false);
  };

  // const handleGoogleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     await loginGoogle();
  //     toast.success("Signed In!", {
  //       position: toast.POSITION.TOP_CENTER,
  //       autoClose: 3000,
  //     });
  //     toast.onChange((payload) => {
  //       if (
  //         payload.status === "removed" &&
  //         payload.type === toast.TYPE.SUCCESS
  //       ) {
  //         navigate("/account");
  //       }
  //     });
  //   } catch (e) {
  //     setIsAlert(true);
  //     setError(e.message);
  //     console.log(e.message);
  //   }
  //   setLoading(false);
  // };

  return (
    <div className="sign-in-bg">
      <ToastContainer />
      <div className="sign-in">
        <h1>Welcome back!</h1>
        {isAlert && <Alerts variant="danger" message={error} />}
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

          <Button disabled>
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
