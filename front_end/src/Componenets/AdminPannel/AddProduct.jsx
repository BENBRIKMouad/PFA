import React, { Component } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Redirect, Route } from "react-router-dom";

import axios from "axios";
class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      prix: 1,
      photo: null,
      isPromo: false,
      discount: null,
    };

    this.ChangeForm = this.ChangeForm.bind(this);
    this.ChangePromo = this.ChangePromo.bind(this);
    this.debugItem = this.debugItem.bind(this);
    this.SendItem = this.SendItem.bind(this);
  }

  ChangeForm(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  ChangePromo(e) {
    this.setState({ [e.target.name]: e.target.checked });
    if (e.target.checked === false) {
      this.setState({
        discount: null,
      });
    }
  }
  debugItem(e) {
    this.setState({ [e.target.name]: e.target.files[0] });

    console.log(e.target.files[0]);
  }
  SendItem() {
    axios
      .post("http://127.0.0.1:8000/api/product/", {
        title: this.state.name,
        description: this.state.description,
        price: this.state.prix,
        // photo: this.state.photo,
        discount_price: this.state.discount,
      })
      .then(
        this.setState({
          name: "",
          description: "",
          prix: 1,
          photo: null,
          discount: null,
          isPromo: false,
        })
      )
      .catch((err) => console.log(err));
  }
  render() {
    console.log(this.state);
    return (
      <>
        <Container>
          <h1 className="display-2 text-center">Ajouter Un Produits</h1>
          <Form>
            <Form.Group>
              <Form.Label>Nom du produit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom"
                onChange={this.ChangeForm}
                required={true}
                value={this.state.name}
                name="name"
              />
            </Form.Group>{" "}
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Description"
                onChange={this.ChangeForm}
                value={this.state.description}
                name="description"
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
            <Form.Group>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Mettre Le Produit en Promo"
                name="isPromo"
                onChange={this.ChangePromo}
              />
            </Form.Group>
            {this.state.isPromo ? (
              <Form.Group>
                <Form.Label>Nouveau Prix</Form.Label>
                <Form.Control
                  type="number"
                  onChange={this.ChangeForm}
                  value={this.state.discount}
                  name="discount"
                />
              </Form.Group>
            ) : null}
            <input type="file" onChange={this.debugItem} name="photo" />
            <Button variant="primary" onClick={this.SendItem}>
              Envoyer
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}

export default AddProduct;
