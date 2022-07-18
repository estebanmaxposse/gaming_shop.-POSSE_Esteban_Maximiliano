import React, { useState } from "react";
import { Button, Modal, Container, Row, Col, Image } from 'react-bootstrap';
import ItemCount from './ItemCount';

export const ItemDetail = ({product, showModal, closeModal}) => {
  const [show, setShow] = useState(false);

  console.log(product);

  return (
    <div>
      <Modal show={showModal} centered size="lg" onHide={closeModal} className="item-detail">
        <Modal.Header className="item-detail-header" closeButton>
          <Modal.Title>{product.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer className="item-detail-footer">
          <Button variant="primary" className="item-detail-footer-button" onClick={closeModal}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ItemDetail;
