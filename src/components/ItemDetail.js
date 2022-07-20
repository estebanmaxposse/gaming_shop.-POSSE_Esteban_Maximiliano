import React from "react";
import { Container, Row, Col, Image } from 'react-bootstrap';
import ItemCount from './ItemCount';

export const ItemDetail = ({product}) => {
  return (
    <div>
      <div className="item-detail">
          <Container fluid>
            <Row>
              <Col xs={12} md={6} className="item-detail-container">
                <Image src={product.pictureUrl} className="item-detail-container-image"/>
              </Col>
              <Col xs={12} md={6} className="item-detail-info">
                <h4 className="item-detail-info-title">{product.title}</h4>
                <p className="item-detail-info-price">${product.price}</p>
                <p className="item-detail-info-description">{product.description}</p>
                <ItemCount stock={product.stock} initial={1} className="item-detail-stock"/>
              </Col>
            </Row>
          </Container>
      </div>
    </div>
  );
};

export default ItemDetail;
