import React from "react";
import { Backdrop } from "@mui/material";
import { Image } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const LoadingBackdrop = () => {
  const { loading } = useAuth();
  return (
    <Backdrop
      open={loading}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 999 }}
    >
      <div className="d-flex justify-content-center align-content-center">
        <div className="loading-gif">
          <Image src="https://i.imgur.com/doB2Gtc.gif" />
          <p>Loading...</p>
        </div>
      </div>
    </Backdrop>
  );
};

export default LoadingBackdrop;
