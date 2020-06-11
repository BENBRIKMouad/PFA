import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export class NavBarComp extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Link className="navbar-brand" to="/">
          MyFood
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link>A propos</Nav.Link>
            <Link className="btn btn-outline-secondary mx-2" to="/SignUp">
              {" "}
              S'inscrire / Se connecter{" "}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBarComp;
