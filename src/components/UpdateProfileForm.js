import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "../contexts/UserContext";
import WarningModal from "./WarningModal";

const UpdateProfileForm = ({ setShow }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const { setLoading } = useAuth();
  const { updateUser, fetchUserData, user } = useUser();

  const [formDisplayName, setFormDisplayName] = useState(
    user?.displayName || ""
  );
  const [formEmail, setFormEmail] = useState(user?.email || "");
  const [formPassword, setFormPassword] = useState("");
  const [formConfirmPassword, setFormConfirmPassword] = useState("");
  const [formPhoneNumber, setFormPhoneNumber] = useState(
    user?.phoneNumber || ""
  );
  const [formShippingAddress, setFormShippingAddress] = useState(
    user?.shippingAddress || ""
  );

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordValidation = () => {
    if (formPassword && formConfirmPassword) {
      if (formPassword === formConfirmPassword) {
        return formPassword;
      } else {
        toast.error("Passwords don't match!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        });
      }
    } else {
      return;
    }
  };

  const handleConfirmPassword = () => {
    setShowConfirmedPassword(!showConfirmedPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    handlePasswordValidation();
    await updateUser(
      formDisplayName,
      formPhoneNumber,
      formShippingAddress,
      formEmail,
      formPassword
    );
    fetchUserData(true);
    setLoading(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new username"
            autoFocus
            value={formDisplayName}
            onChange={(e) => setFormDisplayName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter new email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new phone number"
            value={formPhoneNumber}
            onChange={(e) => setFormPhoneNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new shipping address"
            value={formShippingAddress}
            onChange={(e) => setFormShippingAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Label>Password</Form.Label>
        <InputGroup
          className="mb-3 sign-in-input"
          controlId="formBasicPassword"
        >
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formPassword}
            onChange={(e) => setFormPassword(e.target.value)}
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
            value={formConfirmPassword}
            onChange={(e) => setFormConfirmPassword(e.target.value)}
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

        <Button
          variant="primary"
          type="submit"
          onMouseDown={handleMouseDown}
          onClick={() => setShow(false)}
        >
          Save changes
        </Button>
        <WarningModal />
      </Form>
      <ToastContainer />
    </>
  );
};

export default UpdateProfileForm;
