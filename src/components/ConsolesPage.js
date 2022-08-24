import React from "react";
import ItemListContainer from "./ItemListContainer";

const ConsolesPage = ({ categoryID }) => {
  return (
    <div>
      <h1 className="category-headline" id="consoles-headline">
        CONSOLES
      </h1>
      <div className="card-container">
        <ItemListContainer categoryID={categoryID} />
      </div>
    </div>
  );
};

export default ConsolesPage;
