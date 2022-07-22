import React from 'react';
import { Image } from 'react-bootstrap';
import gif from '../img/loading.gif';

const LoadingGif = () => {
  return (
    <div className='loading-container'>
        <div className='loading-gif'>
            <Image src={gif} />
            <p>Loading...</p>
        </div>
    </div>
  )
}

export default LoadingGif;