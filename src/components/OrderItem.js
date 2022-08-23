import React from "react";
import { Col, Row, Accordion } from "react-bootstrap";

const OrderItem = ({ order, index }) => {
  console.log(order);
  console.log(order.items);
  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey={index}>
          <Accordion.Header className="d-flex">
            <h3>Order no. {order.id}</h3>
            <p>Status: {order.status}</p>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col xs={12} md={6}>
                {/* <p>Purchase date: {order.date}</p> */}
              </Col>
              <Col xs={12} md={6}>
                <p>Total products: {order.totalItems}</p>
              </Col>
              <Col xs={12} md={6}>
                <h3>Total price: {order.total}</h3>
              </Col>
            </Row>
            {order.items.map((item) => (
              <Col className="item-cart d-flex" key={item.id} xs={12}>
                {console.log(item)}
                <div className="item-cart-text">
                  <h4>{item.title}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Item total: ${item.quantity * item.price}</p>
                </div>
              </Col>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default OrderItem;
