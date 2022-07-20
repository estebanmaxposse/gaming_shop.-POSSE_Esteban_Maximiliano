import React from 'react';
import HomeCarousel from "./HomeCarousel";
import ItemListContainer from "./ItemListContainer";

const Homepage = () => {
  return (
    <>
        <HomeCarousel />
        <div id="best-sellers" className='card-container'>
          <p>Why not try out some of our</p>
          <h1>Best sellers!</h1>
          <ItemListContainer />
        </div>
    </>
  );
};

export default Homepage