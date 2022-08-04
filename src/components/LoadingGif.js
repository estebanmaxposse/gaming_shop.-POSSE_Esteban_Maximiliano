import React from 'react';
import { Image } from 'react-bootstrap';

const LoadingGif = () => {
  return (
    <div className='loading-container'>
        <div className='loading-gif'>
            <Image src="https://i.imgur.com/doB2Gtc.gif" />
            <p>Loading...</p>
        </div>
    </div>
  )
}

export default LoadingGif;