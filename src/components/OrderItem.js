import React from "react";
import { Col, Row, Accordion } from "react-bootstrap";
import { Timestamp } from "firebase/firestore";

const OrderItem = ({ order, index }) => {
  console.log(order);
  console.log(order.items);
  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey={index}>
          <Accordion.Header className="d-flex">
            <h4>Order: {order.id}</h4>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col xs={12} md={6}>
                <p>Status: {order.status}</p>
              </Col>
              <Col xs={12} md={6}>
                <p>Purchase date: {order.date.toDate().toDateString()}</p>
              </Col>
              <Col xs={12} md={6}>
                <p>Total products: {order.totalItems}</p>
              </Col>
              <Col xs={12} md={6}>
                <h4>Total price: ${order.total}</h4>
              </Col>
            </Row>
            {order.items.map((item) => (
              <Col className="item-cart d-flex" key={item.id} xs={12}>
                {console.log(item)}
                <img src={item.pictureURL} alt={item.title} />
                <div className="item-cart-text">
                  <h5>{item.title}</h5>
                  <p>Quantity: {item.quantity}</p>
                  <p>Item total: ${item.quantity * item.price}</p>
                </div>
              </Col>
            ))}
            <Col xs={12}>
              <h4 className="mt-3">Total price: ${order.total}</h4>
            </Col>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default OrderItem;
