import React, { useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ItemCount from "./ItemCount";
import { useCartContext } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const ItemDetail = ({ product }) => {
  const [goToCart, setGoToCart] = useState(false);
  const { addItem } = useCartContext();

  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePurchase = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  const onAdd = (quantity) => {
    setGoToCart(true);
    addItem(product, quantity);
  };

  return (
    <div className="item-detail-bg">
      <div className="item-detail">
        <Container className="item-detail-box">
          <Row>
            <Col xs={12} md={8} className="item-detail-container">
              <Image
                src={product.thumbnail}
                className="item-detail-container-image"
              />
            </Col>
            <Col xs={12} md={4} className="item-detail-info-container">
              <div className="item-detail-info">
                <h3 className="item-detail-info-title">{product.title}</h3>
                <p className="item-detail-info-price">${product.price}</p>
                <p className="item-detail-info-description">
                  {product.description}
                </p>
                {goToCart ? (
                  <Button onClick={handlePurchase}>Finish Purchase</Button>
                ) : (
                  <ItemCount
                    stock={product.stock}
                    onAdd={onAdd}
                    initial={1}
                    className="item-detail-stock"
                  />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ItemDetail;
