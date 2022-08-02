import React from "react";
import { Col, Row } from "react-bootstrap";
import { useCartContext } from "../contexts/CartContext";

const OrderSummary = () => {
  const { totalPrice, calcTaxes, addTaxes } = useCartContext();

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
      <button>Go to checkout!</button>
    </div>
  );
};

export default OrderSummary;
