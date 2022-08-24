import React from "react";
import HomeCarousel from "./HomeCarousel";
import ItemListContainer from "./ItemListContainer";

const Homepage = () => {
  return (
    <>
      <HomeCarousel />
      <div id="best-sellers" className="card-container">
        <p>Check out our</p>
        <h1>Entire Catalogue!</h1>
        <ItemListContainer />
      </div>
    </>
  );
};

export default Homepage;
