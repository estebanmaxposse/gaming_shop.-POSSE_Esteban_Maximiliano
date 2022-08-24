import React from "react";
import { Alert } from "react-bootstrap";

const Alerts = ({ variant, message }) => {
  return (
    <Alert key={variant} variant={variant}>
      {message}
    </Alert>
  );
};

export default Alerts;
