import React, {useState} from 'react';
import { Button, Modal, Container, Row, Col, Image } from 'react-bootstrap';
import testGame from '../img/game_mario_kart_8_boxart.png';
import ItemCount from './ItemCount';

const ItemCountModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <div>
            <Button onClick={handleShow}>Toggle Item Count Modal</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Item Count Test</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row>
                            <Col>
                                <Image fluid src={testGame}/>
                            </Col>
                            <Col>
                                <h5>Mario Kart 8 Deluxe</h5>
                                <p>$60,00</p>
                                <ItemCount stock = {11} initial = {1}/>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Done
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ItemCountModal;