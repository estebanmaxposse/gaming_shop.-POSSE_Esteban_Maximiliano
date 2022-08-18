import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import UpdateProfileForm from "./UpdateProfileForm";

const AccountModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>Edit profile</Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateProfileForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AccountModal;
