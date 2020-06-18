import React, { Component } from "react";
import { Navbar, Nav, Dropdown, NavDropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/auth";
import axios from "axios";

export class NavBarComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Info: {},
      loading: true,
      showmodalPanier: false,
      modalInfo: {},
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.ApiCall = this.ApiCall.bind(this);
    this.PanierHandler = this.PanierHandler.bind(this);
  }
  componentDidUpdate() {
    // this.ApiCall();
  }
  componentWillMount() {}
  async PanierHandler() {
    await axios
      .get(`http://127.0.0.1:8000/api/OrderView/${this.state.Info.user}`)
      .then(({ data }) => this.setState({ modalInfo: data }));
    await this.setState({ showmodalPanier: true });
  }
  ApiCall() {
    const token = localStorage.getItem("token");
    axios
      .post("http://127.0.0.1:8000/api/TokenView/", {
        token: token,
      })
      .then(({ data }) => this.setState({ Info: data, loading: false }))
      .catch((err) => console.log(err));
  }
  async handleLogout() {
    await this.setState({ loading: true });
    await this.props.logout();
  }
  render() {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Link className="navbar-brand" to="/">
            MyFood
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {this.props.isAuthenticated ? (
                <>
                  {this.state.loading ? (
                    this.ApiCall()
                  ) : (
                    <>
                      <button onClick={this.PanierHandler}>Panier</button>
                      <NavDropdown title="Menu" id="nav-dropdown">
                        {this.state.Info.is_admin ? (
                          // <NavDropdown.Item eventKey="4.1">
                          <Link
                            to="/adminv2"
                            className=" text-reset text-decoration-none"
                          >
                            Admin Pannel
                          </Link>
                        ) : (
                          // </NavDropdown.Item>
                          // <NavDropdown.Item eventKey="4.1">
                          <Link
                            to="/adminv2"
                            className="text-reset text-decoration-none"
                          >
                            Client Pannel
                          </Link>
                          // </NavDropdown.Item>
                        )}

                        <NavDropdown.Item eventKey="4.2">
                          <Link to="/">Settings</Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  )}
                  <button
                    className="btn btn-outline-secondary mx-2"
                    // onClick={this.props.logout}
                    onClick={this.handleLogout}
                  >
                    déconnecter
                  </button>
                </>
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
        <Modal
          show={this.state.showmodalPanier}
          onHide={() => this.setState({ showmodalPanier: false })}
          animation={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Panier </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.state.product.map((item) => (
              <img />
            ))}
          </Modal.Body>

          <Modal.Footer>test</Modal.Footer>
        </Modal>
      </>
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
