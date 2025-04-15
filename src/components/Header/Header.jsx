import React from "react";
import { Navbar, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to="/home" className="navbar-brand">
            <Image src="https://res.cloudinary.com/dntcdrfiq/image/upload/v1744641869/logo_web-03_4_e8lvkf.svg" />
            ICOT
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/about-us" className="nav-link">
              About Us
            </Link>
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <Link to="/custom" className="nav-link">
              Custom
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
