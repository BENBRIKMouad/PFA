import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as actions from "../../Store/Actions/auth";
import { connect } from "react-redux";
import signInimage from "../../assets/2813122.jpg";

var sectionStyle = {
  backgroundImage: `url(${signInimage})`,
  backgroundSize: "cover",
  width: "100%",
  height: "100%",
};
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
    return (
      <>
        <div style={sectionStyle}>
          <div className="container">
            <div className="row">
              <div className="col-sm-0 col-md-7  mx-auto"></div>

              <div className="col-sm-12 col-md-5  mx-auto">
                <div className="card card-signin my-5">
                  <div className="card-body">
                    <h5 className="card-title text-center">S'inscrire</h5>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email address : </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="xxx@xxxxx.x"
                          name="email"
                          onChange={this.ChangeForm}
                        />
                      </Form.Group>
                      <Form.Group controlId="formGroupUsername">
                        <Form.Label>Nom d'utilisateur : </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nom d'utilisateur"
                          name="username"
                          onChange={this.ChangeForm}
                        />
                      </Form.Group>
                      <Form.Group controlId="formGroupPassword">
                        <Form.Label>Mot de Passe : </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="******"
                          name="password"
                          onChange={this.ChangeForm}
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                          au moins de 8-20 caractéres.
                        </Form.Text>
                      </Form.Group>
                      <Form.Group controlId="formGroupPassword">
                        <Form.Label>Téléphone : </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="06.."
                          name="tel"
                          onChange={this.ChangeForm}
                        />
                      </Form.Group>
                      <Form.Group controlId="formGroupPassword">
                        <Form.Label>Ville : </Form.Label>
                        <Form.Control
                          type="text"
                          // placeholder="Paris "
                          name="city"
                          onChange={this.ChangeForm}
                        />
                      </Form.Group>
                      <Form.Group controlId="formGroupPassword">
                        <Form.Label>Address : </Form.Label>
                        <Form.Control
                          type="text"
                          // placeholder="0667"
                          name="address"
                          onChange={this.ChangeForm}
                        />
                      </Form.Group>
                      <Form.Group controlId="formGroupPassword">
                        <Form.Label>Code Postale : </Form.Label>
                        <Form.Control
                          type="text"
                          // placeholder="0667"
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
        </div>
      </>
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
