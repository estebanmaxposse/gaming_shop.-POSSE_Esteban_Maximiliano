import React from "react";
import { Col, Row } from "react-bootstrap";
import { useCartContext } from "../contexts/CartContext";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast, ToastContainer, ToastItem } from "react-toastify";
import { useUser } from "../contexts/UserContext";

const OrderSummary = () => {
  const { totalPrice, calcTaxes, addTaxes, clearCart, cart } = useCartContext();

  const { user } = useUser();

  const order = {
    date: Timestamp.now(),
    buyer: {
      name: user?.displayName || user?.email,
      email: user.email,
      phone: user?.phoneNumber,
      address: user?.shippingAddress,
    },
    items: cart.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: product.quantity,
    })),
    total: totalPrice(),
  };

  const createOrder = () => {
    const database = db;
    const orderCollection = collection(database, "orders");
    const addToCollectionPromise = addDoc(orderCollection, order);  
    toast.promise(addToCollectionPromise, {
      pending: 'Placing order...',
      success: {
        render({data: {id}}){
          return `Successfully placed order ${id}`
        },
      },
      error: 'Something went wrong!',
    });
    toast.onChange(payload => {
      if (payload.status === "removed" && payload.type === toast.TYPE.SUCCESS) {
        clearCart();
      }
    })
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
