import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default class SignUp extends Component {
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
              <div class="card-body">
                <h5 class="card-title text-center">S'inscrire</h5>
                <Form>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address : </Form.Label>
                    <Form.Control type="email" placeholder="XXX@XXX.XX" />
                  </Form.Group>
                  <Form.Group controlId="formGroupUsername">
                    <Form.Label>Pseudo : </Form.Label>
                    <Form.Control type="text" placeholder="Pseudo" />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>Mot de Passe : </Form.Label>
                    <Form.Control type="password" placeholder="*****" />
                    <Form.Text id="passwordHelpBlock" muted>
                      au moins de 8-20 caractéres.
                    </Form.Text>
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
