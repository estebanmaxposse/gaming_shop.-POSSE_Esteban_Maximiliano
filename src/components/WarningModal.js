import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useUser } from "../contexts/UserContext";

const WarningModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { deleteUserProfile } = useUser();

  const handleDeleteUser = () => {
    deleteUserProfile();
    handleClose();
  };
  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete Account
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This action will delte
          all of your files and records
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Go back!
          </Button>
          <Button variant="primary" onClick={handleDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WarningModal;
