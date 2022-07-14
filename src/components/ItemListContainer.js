import React from "react";
import { Row } from "react-bootstrap";
import { ItemList } from "./ItemList";

const ItemListContainer = () => {
    return (
    <div id="best-sellers">
        <p>Why not try out some of our</p>
        <h1>Best sellers!</h1>
        <Row>
            <ItemList></ItemList>
        </Row>
    </div>  
    )
}

export default ItemListContainer;