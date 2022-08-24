import React from "react";
import { Row } from "react-bootstrap";
import ItemList from "./ItemList";

const ItemListContainer = ({ categoryID }) => {
  return (
    <div>
      <Row>
        <ItemList categoryID={categoryID} />
      </Row>
    </div>
  );
};

export default ItemListContainer;
