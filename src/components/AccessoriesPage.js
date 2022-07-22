import React from "react";
import ItemListContainer from "./ItemListContainer";

const AccessoriesPage = ({ categoryID }) => {
  return (
    <div>
      <h1 className="category-headline" id="accessories-headline">ACCESSORIES</h1>
      <div className="card-container">
        <ItemListContainer categoryID={categoryID} />
      </div>
    </div>
  );
}

export default AccessoriesPage;
