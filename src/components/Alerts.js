import React from 'react';
import { Alert } from 'react-bootstrap';
import { useNotif } from '../contexts/NotifContext';

const Alerts = () => {
    const { alert: {isAlert, variant, message}, setAlert } = useNotif();

  return (
    <Alert key={variant} variant={variant}>{message}</Alert>
  )
}

export default Alerts