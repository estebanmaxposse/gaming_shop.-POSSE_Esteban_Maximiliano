import React from "react";
import ItemListContainer from "./ItemListContainer";

const GamesPage = ({ categoryID }) => {
  return (
    <div>
      <h1 className="category-headline" id="games-headline">
        GAMES
      </h1>
      <div className="card-container">
        <ItemListContainer categoryID={categoryID} />
      </div>
    </div>
  );
};

export default GamesPage;
