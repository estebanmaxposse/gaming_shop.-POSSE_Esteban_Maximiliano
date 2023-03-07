import React from "react";
import { Col, Row } from "react-bootstrap";
import { useCartContext } from "../contexts/CartContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const { totalPrice, clearCart, createOrder, } = useCartContext();

  const navigate = useNavigate();

  const sendOrder = () => {
    const order =  createOrder()
    toast.promise(order, {
      pending: "Placing order...",
      success: {
        render() {
          return `Successfully placed order!`;
        },
      },
      error: "Something went wrong!",
    });
    toast.onChange((payload) => {
      if (payload.status === "removed" && payload.type === toast.TYPE.SUCCESS) {
        clearCart();
        navigate("/account");
      }
    });
  };

  return (
    <div className="summary d-flex">
      <ToastContainer />
      <h2 className="summary-title">Order Summary</h2>
      <Row className="summary-list">
        <Col xs={6} className="summary-list-subtitle">
          Subotal:
        </Col>
        <Col xs={6} className="summary-list-value">
          ${totalPrice()}
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
          ${totalPrice()}
        </Col>
      </Row>
      <button onClick={sendOrder}>Go to checkout!</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
    </div>
  );
};

export default OrderSummary;
