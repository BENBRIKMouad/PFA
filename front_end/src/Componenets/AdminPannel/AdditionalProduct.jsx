import React, { Component } from "react";
import { Button, Form, Container } from "react-bootstrap";
// import { Redirect, Route } from "react-router-dom";

import axios from "axios";
class AdditionalProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      prix: 1,
    };

    this.ChangeForm = this.ChangeForm.bind(this);
    this.SendItem = this.SendItem.bind(this);
  }

  ChangeForm(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  SendItem() {
    axios
      .post("http://127.0.0.1:8000/api/additional_item/", {
        title: this.state.name,
        price: this.state.prix,
      })
      .then(
        this.setState({
          name: "",
          prix: 1,
        })
      )
      .catch((err) => console.log(err));
  }
  render() {
    console.log(this.state);
    return (
      <>
        <Container>
          <h1 className="display-2 text-center">Produit Additionel</h1>
          <Form>
            <Form.Group>
              <Form.Label>Nom du produit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom"
                onChange={this.ChangeForm}
                value={this.state.name}
                name="name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                onChange={this.ChangeForm}
                required={true}
                value={this.state.prix}
                name="prix"
              />
            </Form.Group>

            <Button variant="primary" onClick={this.SendItem}>
              Envoyer
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}

export default AdditionalProduct;
