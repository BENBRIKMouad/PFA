import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/auth";

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
            {this.props.isAuthenticated ? (
              <button
                className="btn btn-outline-secondary mx-2"
                onClick={this.props.logout}
              >
                {" "}
                déconnecter
              </button>
            ) : (
              <>
                <Nav.Link>A propos</Nav.Link>
                <Link className="btn btn-outline-secondary mx-2" to="/SignUp">
                  {" "}
                  S'inscrire / Se connecter{" "}
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBarComp);
