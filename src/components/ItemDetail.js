import React from "react";
import { Container, Row, Col, Image } from 'react-bootstrap';
import ItemCount from './ItemCount';

const ItemDetail = ({product}) => {
  return (
    <div className="item-detail-bg">
      <div className="item-detail">
          <Container className="item-detail-box">
            <Row>
              <Col xs={12} md={8} className="item-detail-container">
                <Image src={product.pictureUrl} className="item-detail-container-image"/>
              </Col>
              <Col xs={12} md={4} className="item-detail-info-container">
                <div className="item-detail-info">
                  <h3 className="item-detail-info-title">{product.title}</h3>
                  <p className="item-detail-info-price">${product.price}</p>
                  <p className="item-detail-info-description">{product.description}</p>
                  <ItemCount stock={product.stock} initial={1} className="item-detail-stock"/>
                </div>
              </Col>
            </Row>
          </Container>
      </div>
    </div>
  );
};

export default ItemDetail;
