import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as actions from "../../Store/Actions/auth";
import { connect } from "react-redux";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      tel: "",
      city: "",
      postal_code: "",
      address: "",
    };
    this.ChangeForm = this.ChangeForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  ChangeForm(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(Event) {
    Event.preventDefault();
    this.props.onAuth(
      this.state.username,
      this.state.email,
      this.state.password,
      this.state.tel,
      this.state.city,
      this.state.postal_code,
      this.state.address
    );
    this.props.history.push("/");
  }

  render() {
    // console.log(this.state);
    // console.log(this.props.error);

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">S'inscrire</h5>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address : </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="XXX@XXX.XX"
                      name="email"
                      onChange={this.ChangeForm}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGroupUsername">
                    <Form.Label>Nom d'utilisateur : </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="UserName"
                      name="username"
                      onChange={this.ChangeForm}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>Mot de Passe : </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="*****"
                      name="password"
                      onChange={this.ChangeForm}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                      au moins de 8-20 caractéres.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>tel : </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="0667"
                      name="tel"
                      onChange={this.ChangeForm}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>city : </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="0667"
                      name="city"
                      onChange={this.ChangeForm}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>address : </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="0667"
                      name="address"
                      onChange={this.ChangeForm}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>PostalCode : </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="0667"
                      name="postal_code"
                      onChange={this.ChangeForm}
                    />
                  </Form.Group>
                  <Button
                    variant="success"
                    type="submit"
                    className="text-center"
                  >
                    Envoyer
                  </Button>
                  <h5 className="my-2">
                    Vous avez déja un compte ?{" "}
                    <Link to="/SignIn">Connectez Vous </Link>
                  </h5>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, email, password, tel, city, postal_code, address) =>
      dispatch(
        actions.authSignup(
          username,
          email,
          password,
          tel,
          city,
          postal_code,
          address
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
