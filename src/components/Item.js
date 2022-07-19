import React, { useState } from "react";
import { Button, Col, Card } from "react-bootstrap";
import ItemDetailContainer from "./ItemDetailContainer";

const Item = ({ product, index }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Col md={4} className="mb-4">
      <Card className="homepage-card" onClick={handleShow}>
        <div className="homepage-card-img">
          <Card.Img variant="top" src={product.pictureUrl} />
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <div className="d-flex w-100 price-stock">
            <h6>${product.price}.00</h6>
            <p className="text-muted">Stock Available: {product.stock}</p>
          </div>
          <Button className="homepage-card-button">Add to cart</Button>
        </Card.Body>
      </Card>
      <ItemDetailContainer showModal={show} closeModal={handleClose} index={index}/>
    </Col>
  );
};

export default Item;
