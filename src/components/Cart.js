import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import { Button, Row, Col, Image } from "react-bootstrap";
import ItemCart from "./ItemCart";
import OrderSummary from "./OrderSummary";

const Cart = () => {
  const { cart, totalProducts } = useCartContext();

  if (cart.length === 0) {
    return (
      <div className="empty-cart not-found">
        <Row>
          <Col xs={12} md={6} className="not-found-text">
            <h1
              className="not-found-header-title"
              id="cart-headline"
            >
              Your Cart is empty!
            </h1>
            <p className="empty-cart-text">
              You haven't added anything yet! Go back and improve your gaming
              experience!
            </p>
          </Col>
          <Col xs={12} md={4} className="not-found-image">
            <Image src="https://i.imgur.com/WCYp687.gif" />
            <Link to={"/"}>
              <Button>Go home!</Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="cart-list-bg">
      <h1 className="cart-list-header category-headline" id="cart-headline">
        Your Cart:
      </h1>
      <h4 className="category-headline">{totalProducts()} Items</h4>
      <div className="cart-list-container d-flex">
        <div className="cart-list-box d-flex">
          <Row className="cart-list">
            {cart.map((product) => (
              <ItemCart key={product.id} product={product} />
            ))}
          </Row>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
