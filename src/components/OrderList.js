import React, { useState, useEffect } from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../firebase/config";
import LoadingGif from "./LoadingGif";
import { useUser } from "../contexts/UserContext";
import OrderItem from "./OrderItem";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setData] = useState([]);

  const { user, fetchUserData } = useUser();

  const fetchOrders = async () => {
    setIsLoading(true);
    await fetchUserData(true);
    console.log(user);

    const queryDatabase = db;
    const queryCollection = collection(queryDatabase, "orders");
    const queryFilter = query(
      queryCollection,
      where("buyer.buyerID", "==", user?.uid)
    );
    fetchUserData(true).then(
      getDocs(queryFilter).then(
        (res) => {
          setIsLoading(false);
          setData(res.docs.map((order) => ({ id: order.id, ...order.data() })));
        },
        (error) => {
          console.log("Fetching data error" + error);
        }
      )
    )
  }

  useEffect(() => {
    fetchOrders();
  }, [])
  

  if (orders.length === 0) {
    return (
      <div className="empty-cart not-found">
        <Row>
          <Col xs={12} md={6} className="not-found-text">
            <h1
              className="not-found-header-title"
              id="cart-headline"
            >
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
          <OrderItem key={order.id} order={order} index={index} />
        ))
      )}
    </>
  );
};

export default OrderList;
