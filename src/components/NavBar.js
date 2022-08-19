import React from "react";
import {
  Navbar,
  Offcanvas,
  Nav,
  Container,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import SearchBar from "./SearchBar";
import AvatarDropdown from "./AvatarDropdown";
import { useUser } from "../contexts/UserContext";

const NavBar = () => {
  const { user } = useUser();
  
  return (
    <header>
      <Navbar variant="dark" expand="lg" sticky="top">
        <Container fluid>
          <NavLink className="navbar-brand" to={"/"}>
            <img
              src="https://i.imgur.com/y61iWez.png"
              alt="logo"
              width="35"
              height="35"
            />
            <span>Cartridge Valley</span>
          </NavLink>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown
                  title="Categories"
                  id="offcanvasNavbarDropdown-expand-lg"
                >
                  <li>
                    <NavLink className="dropdown-item" to={"/category/games"}>
                      Games
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/category/consoles"}
                    >
                      Consoles
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={"/category/accessories"}
                    >
                      Accessories
                    </NavLink>
                  </li>
                </NavDropdown>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/about"}>
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/contact"}>
                    Contact
                  </NavLink>
                </li>
                <SearchBar />
                <CartWidget />
                {user ? (
                  <AvatarDropdown />
                ) : (
                  <Link to={"/login"}>
                    <Button className="position-relative" id="sign-up-button">
                      Log in!
                    </Button>
                  </Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
