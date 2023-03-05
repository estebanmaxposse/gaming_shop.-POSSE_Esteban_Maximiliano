import React from "react";
import HomeCarousel from "./HomeCarousel";
import ItemListContainer from "./ItemListContainer";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const Homepage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) {
    navigate('/login');
    return null;
  } else {
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
  }
};

export default Homepage;
