import React, { useState } from "react";
import { Button, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Item = ({ product }) => {
  return (
    <Col md={4} className="mb-4">
      <Link to={`/detail/${product.id}`}>
        <Card className="product-card">
          <div className="product-card-img">
            <Card.Img variant="top" src={product.pictureUrl} />
          </div>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <div className="d-flex w-100 price-stock">
              <h6>${product.price}.00</h6>
              <p className="text-muted">Stock Available: {product.stock}</p>
            </div>
            <Button className="product-card-button">Add to cart</Button>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default Item;
