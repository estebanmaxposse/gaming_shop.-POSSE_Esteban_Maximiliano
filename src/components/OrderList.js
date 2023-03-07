import React, { useState, useEffect } from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import LoadingGif from "./LoadingGif";
import { useCartContext } from "../contexts/CartContext";
import OrderItem from "./OrderItem";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setData] = useState([]);

  const { getOrders } = useCartContext();

  const formatOrder = (orderProducts) => {
    const products = orderProducts.map(({ product, quantity }) => ({
      ...product,
      quantity
    }));
    return products;
  }

  const fetchOrders = async () => {
    setIsLoading(true);
    let ordersDB = await getOrders()
    if (!ordersDB) {
      return
    } else {
      const formattedOrder = ordersDB.map((order) => {
        return {
          ...order,
          products: formatOrder(order.products),
        };
      })
      setData(formattedOrder);
    }
  };

  useEffect(() => {
    fetchOrders();
    setIsLoading(false);
  }, []);

  if (isLoading && orders.length === 0) {
    return (
      <div className="empty-cart not-found">
        <Row>
          <Col xs={12} md={6} className="not-found-text">
            <h1 className="not-found-header-title" id="cart-headline">
              You haven't ordered anything yet!
            </h1>
            <p className="empty-cart-text">
              Why don't you go back and get some gamer goodies!
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
    <>
      {isLoading ? (
        <LoadingGif />
      ) : (
        orders.map((order, index) => (
          <OrderItem key={order._id} order={order} index={index} />
        ))
      )}
    </>
  );
};

export default OrderList;
