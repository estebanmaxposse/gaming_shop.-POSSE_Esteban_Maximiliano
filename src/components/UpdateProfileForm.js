import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const UpdateProfileForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const { currentUser, setLoading } = useAuth();

  const [name, setName] = useState(currentUser?.displayName);
  const [shippingAddress, setShippingAddress] = useState(
    currentUser?.shippingAddress || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    currentUser?.phoneNumber || undefined
  );
  //   const [ file, setFile ] = useState(null);
  //   const [ photoURL, setPhotoURL ] = useState(currenUser?.photoURL);

  //   const handleChange = (e) => {
  //     const file = e.target.files[0];
  //     setFile(file);
  //     setPhotoURL(URL.createObjectURL(file));
  //   }

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPassword = () => {
    setShowConfirmedPassword(!showConfirmedPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let userObj = { displayName: name, phoneNumber: phoneNumber, shippingAddress: shippingAddress };
    try {
      await updateProfile(currentUser, userObj);
      toast.success("Profile successfully updated!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error);
    }
    setLoading(false);
    console.table(currentUser)
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
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter new email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new phone number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new shipping address"
            onChange={(e) => setShippingAddress(e.target.value)}
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

        <Button variant="primary" type="submit" onMouseDown={handleMouseDown}>
          Save changes
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default UpdateProfileForm;
