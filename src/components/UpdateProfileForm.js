import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const UpdateProfileForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const { currenUser } = useAuth();

  const [ name, setName ] = useState(currenUser?.displayName);

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPassword = () => {
    setShowConfirmedPassword(!showConfirmedPassword);
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new username"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter new email" autoFocus />
        </Form.Group>

        <Form.Label>Password</Form.Label>
        <InputGroup
          className="mb-3 sign-in-input"
          controlId="formBasicPassword"
        >
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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

        <Button variant="primary" onMouseDown={handleMouseDown} >Save changes</Button>
      </Form>
    </>
  );
};

export default UpdateProfileForm;
