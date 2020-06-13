import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/auth";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      mdp: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ChangeForm = this.ChangeForm.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onAuth(this.state.username, this.state.mdp);
    this.props.history.push("/");
  }
  ChangeForm(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
      console.log(this.props.error);
    }
    console.log(this.state);
    return (
      <>
        {errorMessage}
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Se Connecter</h5>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGroupEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="UserName"
                        name="username"
                        onChange={this.ChangeForm}
                      />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                      <Form.Label>Mot de Passe</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="*****"
                        name="mdp"
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
                      Vous n'avez pas un coompte ?{" "}
                      <Link to="/SignUp">Inscrivez Vous </Link>
                    </h5>
                  </Form>
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
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
