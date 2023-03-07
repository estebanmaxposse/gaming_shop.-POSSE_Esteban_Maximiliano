import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useCartContext } from "../contexts/CartContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [age, setAge] = useState("");
  const [avatar, setAvatar] = useState("https://i.imgur.com/3oHh4La.png");

  const navigate = useNavigate();

  const { signUp, setLoading } = useAuth();
  const { initialCart } = useCartContext();

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
      let token = await signUp(email, password, username, fullName, phoneNumber, shippingAddress, age, avatar);
      await initialCart(token);
      toast.success("Signed up!", {
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
      toast.error(e.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000,
      });
      console.log(e.message);
    }
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

          <Form.Label>Username</Form.Label>
          <InputGroup className="mb-3 sign-in-input" controlId="formBasicUsername">
            <Form.Control
              type="text"
              placeholder="Your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>

          <Form.Label>Full name</Form.Label>
          <InputGroup className="mb-3 sign-in-input" controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="John Johnson"
              onChange={(e) => setFullName(e.target.value)}
            />
          </InputGroup>

          <Form.Label>Phone Number</Form.Label>
          <InputGroup className="mb-3 sign-in-input" controlId="formBasicPhoneNumber">
            <Form.Control
              type="tel"
              placeholder="+54 123-456-7890"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </InputGroup>

          <Form.Label>Shipping Address</Form.Label>
          <InputGroup className="mb-3 sign-in-input" controlId="formBasicAddress">
            <Form.Control
              type="text"
              placeholder="1234 Main St"
              onChange={(e) => setShippingAddress(e.target.value)}
            />
          </InputGroup>

          <Form.Label>Age</Form.Label>
          <InputGroup className="mb-3 sign-in-input" controlId="formBasicAge">
            <Form.Control
              type="number"
              placeholder="18"
              onChange={(e) => setAge(e.target.value)}
            />
          </InputGroup>

          <Form.Label>Avatar</Form.Label>
          <InputGroup className="mb-3 sign-in-input" controlId="formBasicAvatar">
            <Form.Control
              type="text"
              placeholder="https://i.imgur.com/3oHh4La.png"
              onChange={(e) => setAvatar(e.target.value)}
            />
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
