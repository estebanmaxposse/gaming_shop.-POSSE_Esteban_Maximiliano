import React from "react";
import { Image } from "react-bootstrap";

const LoadingGifWidescreen = () => {
  return (
    <div className="loading-widescreen-container">
      <div className="loading-gif">
        <Image src="https://i.imgur.com/doB2Gtc.gif" />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingGifWidescreen;
