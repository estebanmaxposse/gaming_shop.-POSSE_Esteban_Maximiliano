import React from "react";
import { Col, Row, Accordion } from "react-bootstrap";

const OrderItem = ({ order, index }) => {
  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey={index} className="order">
          <Accordion.Header className="d-flex order-header">
            <h4 className="order-header-title">Order: {order._id}</h4>
          </Accordion.Header>
          <Accordion.Body>
            <Row className="order-details">
              <Col xs={12} md={6} className="order-details-item">
                <p>Status: {order.status}</p>
              </Col>
              <Col xs={12} md={6} className="order-details-item">
                <p>Purchase date: {order.timestamp}</p>
              </Col>
              <Col xs={12} md={6} className="order-details-item">
                <p>Total products: {order.orderTotalProducts}</p>
              </Col>
              <Col xs={12} md={6} className="order-details-item">
                <h4>Total price: ${order.orderTotalPrice}</h4>
              </Col>
            </Row>
            {order.products.map((item) => (
              <Col className="d-flex order-item" key={item._id} xs={12}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="order-item-img"
                />
                <div className="order-item-text">
                  <h5>{item.title}</h5>
                  <p>Quantity: {item.quantity}</p>
                  <p>Item total: ${item.quantity * item.price}</p>
                </div>
              </Col>
            ))}
            <Col xs={12}>
              <h3 className="mt-3 order-price">Total price: ${order.orderTotalPrice}</h3>
            </Col>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default OrderItem;
