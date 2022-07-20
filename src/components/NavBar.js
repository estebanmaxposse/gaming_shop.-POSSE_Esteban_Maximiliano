import React from 'react';
import img from '../img/logo_no_text.png';
import { Navbar, Offcanvas, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';
import SearchBar from './SearchBar';

const NavBar = () => {
    return (
        <header>
            <Navbar variant='dark' expand='lg' sticky='top'>
                <Container fluid>
                    <NavLink className='navbar-brand' to={'/'}>
                        <img src={img} alt='logo' width='35' height='35'/>
                        <span>Cartridge Valley</span>
                    </NavLink>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                    <Navbar.Offcanvas id={`offcanvasNavbar-expand-lg`} aria-labelledby={`offcanvasNavbarLabel-expand-lg`} placement='end'>
                        <Offcanvas.Header closeButton></Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className='justify-content-end flex-grow-1 pe-3'>
                                <NavDropdown title='Categories' id='offcanvasNavbarDropdown-expand-lg'>
                                    <li><NavLink className='dropdown-item' to={'/category/games'}>Games</NavLink></li>
                                    <li><NavLink className='dropdown-item' to={'/category/consoles'}>Consoles</NavLink></li>
                                    <li><NavLink className='dropdown-item' to={'/category/accessories'}>Accessories</NavLink></li>
                                </NavDropdown>
                                <li className='nav-item'><NavLink className='nav-link' to={'/about'}>About</NavLink></li>
                                <li className='nav-item'><NavLink className='nav-link' to={'/contact'}>Contact</NavLink></li>
                                <SearchBar/>
                                <CartWidget/>
                                <Button id='sign-up-button'>Sign Up!</Button>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    )
}

export default NavBar;