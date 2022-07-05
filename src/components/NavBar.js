import React from 'react';
import img from '../img/logo_no_text.png';
import { Navbar, Offcanvas, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import ShoppingCart from './ShoppingCart';

const NavBar = () => {
    return (
        <header>
            <Navbar variant='dark' expand='lg' fixed='top' className='mb-3'>
                <Container fluid>
                    <Navbar.Brand href="#">
                        <img src={img} alt='logo' width="30" height="30"/>
                        <span>Cartridge Valley</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                    <Navbar.Offcanvas id={`offcanvasNavbar-expand-lg`} aria-labelledby={`offcanvasNavbarLabel-expand-lg`} placement="end">
                        <Offcanvas.Header closeButton></Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <NavDropdown title="Categories" id={`offcanvasNavbarDropdown-expand-lg`}>
                                    <NavDropdown.Item href="#action3">Games</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Consoles</NavDropdown.Item>
                                    <NavDropdown.Item href="#action5">Accesories</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#action2">About Us</Nav.Link>
                                <Nav.Link href="#action1">Contact</Nav.Link>
                                <Form className="d-flex">
                                    <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"/>
                                    <Button variant="outline-success">Search...</Button>
                                </Form>
                                <ShoppingCart/>
                                <Button>Sign Up!</Button>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    )
}

export default NavBar;