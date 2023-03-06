import React from "react";
import {
  Navbar,
  Offcanvas,
  Nav,
  Container,
  NavDropdown,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import SearchBar from "./SearchBar";
import AvatarDropdown from "./AvatarDropdown";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { user, isAuthenticated } = useAuth();

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
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/chat"}>
                    Chat
                  </NavLink>
                </li>
                {user ? (
                  <SearchBar />
                ) : (
                  <div className="position-relative">
                    <Form className="d-flex" id="search-bar" disabled>
                      <FormControl
                        type="search"
                        placeholder="LOGIN TO SEARCH..."
                        aria-label="Search"
                        id="search-bar-input"
                        readOnly
                      />
                      <Button variant="success" id="search-bar-button" disabled>
                        <i className="bi bi-search"></i>
                      </Button>
                    </Form>
                  </div>
                )}
                <CartWidget />
                {isAuthenticated ? (
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
