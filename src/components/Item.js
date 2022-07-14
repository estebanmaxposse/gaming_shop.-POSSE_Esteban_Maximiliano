import React from 'react';
import { Card, Col, Row, Button } from "react-bootstrap";

const Item = ({product}) => {
  return (
    <Col md={4} className="mb-4">
        <Card className='homepage-card'>
            <div className='homepage-card-img'>
                <Card.Img variant="top" src={product.pictureUrl} />
            </div>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <div className='d-flex w-100 price-stock'>
                    <h6>${product.price}.00</h6>
                    <p className='text-muted'>Stock Available: {product.stock}</p>
                </div>
                <Button>Add to cart</Button>
            </Card.Body>
        </Card>
    </Col>
  );
};

export default Item;