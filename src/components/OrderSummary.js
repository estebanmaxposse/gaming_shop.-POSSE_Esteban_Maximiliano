import React from "react";
import { Col, Row } from "react-bootstrap";
import { useCartContext } from "../contexts/CartContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

const OrderSummary = () => {
  const { totalPrice, calcTaxes, addTaxes, clearCart, cart } = useCartContext();
  
  const order = {
    buyer: {
      name: 'Esteban',
      email: 'Posse',
      phone: '3874106249',
      address: 'my home'
    },
    items: cart.map(product => ({id: product.id, title: product.title, price: product.price, quantity: product.quantity})),
    total: totalPrice(),
  }

  const createOrder = () => {
    const database = db;
    const orderCollection = collection(database, 'orders');
    addDoc (orderCollection, order)
      .then(({ id }) => alert(`The order "${id}" has been created!`))
  }

  return (
    <div className="summary d-flex">
      <h2 className="summary-title">Order Summary</h2>
      <Row className="summary-list">
        <Col xs={6} className="summary-list-subtitle">
          Subotal:
        </Col>
        <Col xs={6} className="summary-list-value">
          ${totalPrice()}
        </Col>
        <Col xs={6} className="summary-list-subtitle">
          Taxes:
        </Col>
        <Col xs={6} className="summary-list-value">
          ${calcTaxes(totalPrice())}
        </Col>
        <Col xs={6} className="summary-list-subtitle">
          Shipping:
        </Col>
        <Col xs={6} className="summary-list-value">
          Free!
        </Col>
        <Col xs={6} className="summary-list-subtitle total-value">
          Total:
        </Col>
        <Col xs={6} className="summary-list-value total-value">
          ${addTaxes(totalPrice(), calcTaxes(totalPrice()))}
        </Col>
      </Row>
      <button onClick={createOrder}>Go to checkout!</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
    </div>
  );
};

export default OrderSummary;
