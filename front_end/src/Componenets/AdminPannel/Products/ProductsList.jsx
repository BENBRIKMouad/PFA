import React, { Component } from "react";
import axios from "axios";
import { Container, Modal, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
export class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Products: [],
      OpenModal: false,
      name: "",
      description: "",
      prix: 1,
      photo: null,
      isPromo: false,
      discount: null,
      status: null,
      photoprev: null,
      IdSelectedProduct: null,
      addiprodname: "",
      addiprodprice: 0,
      OpenModaladdi: false,
    };
    this.deleteProduct = this.deleteProduct.bind(this);
    this.ChangeProduct = this.ChangeProduct.bind(this);
  }
  ChangeProduct(term) {
    this.setState({
      OpenModal: true,
      name: term.title,
      description: term.description,
      prix: term.price,
      photo: term.photo,
      photoprev: term.photo,
      isPromo: false,
      discount: null,
      status: "modifie",
      IdSelectedProduct: term.id,
    });
  }

  SendChange = () => {
    let form_data = new FormData();

    if (this.state.photoprev != this.state.photo) {
      form_data.append("photo", this.state.photo, this.state.photo.name);
    }

    form_data.append("title", this.state.name);
    form_data.append("price", this.state.prix);
    form_data.append("description", this.state.description);

    let url = `http://127.0.0.1:8000/api/product/${this.state.IdSelectedProduct}/`;
    axios
      .patch(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      // .then((res) => {
      //   console.log(res.data);
      // })
      .then(this.callProducts)
      .catch((err) => console.log(err));
    this.setState({
      OpenModal: false,
      name: "",
      description: "",
      prix: 1,
      photo: null,
      isPromo: false,
      discount: null,
      status: null,
      photoprev: null,
      IdSelectedProduct: null,
    });
  };

  deleteProduct(term) {
    axios
      .delete(`http://127.0.0.1:8000/api/product/${term}/`)
      // .then((res) => console.log(res))
      .then(this.callProducts);
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/ProductView/")
      .then(({ data }) => this.setState({ Products: data }))
      .catch((err) => console.log(err));
  }
  callProducts = () => {
    axios
      .get("http://127.0.0.1:8000/api/ProductView/")
      .then(({ data }) => this.setState({ Products: data }))
      .catch((err) => console.log(err));
  };
  ChangeForm = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageChange = (e) => {
    this.setState({
      photo: e.target.files[0],
    });
  };

  handleAdd = () => {
    this.setState({
      OpenModal: true,

      status: "send",
    });
  };
  SendAdd = () => {
    let form_data = new FormData();
    form_data.append("title", this.state.name);
    form_data.append("photo", this.state.photo, this.state.photo.name);
    form_data.append("price", this.state.prix);
    form_data.append("description", this.state.description);
    form_data.append("discount_price", this.state.discount);
    let url = "http://127.0.0.1:8000/api/product/";
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
    this.setState({
      OpenModal: false,
      name: "",
      description: "",
      prix: 1,
      photo: null,
      isPromo: false,
      discount: null,
      status: null,
      photoprev: null,
      IdSelectedProduct: null,
    });
  };
  render() {
    console.log(this.state);
    const { Products } = this.state;
    return (
      <>
        <h1 className="display-1 lead text-center">Listes de Produits</h1>
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <Link to="/admin" className="btn btn-light btn-block">
                  <FaArrowLeft className="mx-1" /> Retour au Panneau Admin
                </Link>
              </div>
              <div className="col-md-3">
                <button
                  onClick={this.handleAdd}
                  className="btn btn-primary btn-block"
                >
                  <FaPlus className="mx-1" /> Ajouté Plat
                </button>
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-success btn-block"
                  // to={`/admin/AdditionalItem`}
                >
                  <FaPlus className="mx-1" /> Ajouté Supplément
                </button>
              </div>
            </div>
          </div>
        </section>
        <hr />

        <Container>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>photo</th>
                <th>Nom</th>
                <th>Prix</th>
                <th>Supplément</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Products.map((Product) => (
                <tr key={Product.id}>
                  <td>
                    <span className="pill"></span>
                    <div type="button" className="btn btn-primary">
                      id:{" "}
                      <span className="badge badge-light">{Product.id}</span>
                    </div>
                  </td>
                  <td>
                    <img
                      src={Product.photo}
                      alt={Product.slug}
                      className="img-thumbnail img-fluid"
                      style={{ width: 300 }}
                    />
                  </td>

                  <td>{Product.title}</td>
                  <td>{Product.price}</td>

                  <td>
                    {Product.additional_items.length > 0 ? (
                      Product.additional_items.map((add_product) => (
                        <React.Fragment key={add_product.id}>
                          <span className="text-success">
                            {add_product.title} :
                          </span>
                          <span className="text-success">
                            {add_product.price} MAD
                          </span>
                        </React.Fragment>
                      ))
                    ) : (
                      <span className="text-danger">Aucun</span>
                    )}
                  </td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => this.deleteProduct(Product.id)}
                    >
                      supprimer
                    </button>{" "}
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => this.ChangeProduct(Product)}
                    >
                      modifier
                    </button>{" "}
                    {/* <button>supprimer</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
        {this.state.OpenModal ? (
          <>
            <Modal
              show={this.state.OpenModal}
              onHide={() => this.setState({ OpenModal: false })}
              size="lg"
            >
              <div className="modal-content">
                <div className="modal-header border-bottom-0">
                  <h5 className="modal-title" id="exampleModalLabel">
                    {this.state.status === "send" ? (
                      <> Ajouter unPlat</>
                    ) : (
                      <>Changer le plat</>
                    )}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => this.setState({ OpenModal: false })}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {" "}
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
                    <Form.Group>
                      <Form.Label>Produit additionel</Form.Label>
                    </Form.Group>
                    <p>
                      <input
                        type="file"
                        id="image"
                        accept="image/png, image/jpeg"
                        onChange={this.handleImageChange}
                        required
                      />
                    </p>
                  </Form>
                </div>
                <div className="modal-footer border-top-0 d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => this.setState({ OpenModal: false })}
                  >
                    Fermé
                  </button>
                  {this.state.status === "send" ? (
                    <button
                      type="button"
                      onClick={this.SendAdd}
                      className="btn btn-success"
                      // onClick={}
                    >
                      Envoyé
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={this.SendChange}
                    >
                      Modifier
                    </button>
                  )}
                </div>
              </div>
            </Modal>
          </>
        ) : null}

        {this.state.OpenModaladdi ? (
          <>
            <Modal
              show={this.state.OpenModaladdi}
              onHide={() => this.setState({ OpenModaladdi: false })}
              size="lg"
            >
              <div className="modal-content">
                <div className="modal-header border-bottom-0">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Chnager la commande
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => this.setState({ OpenModaladdi: false })}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
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
                  </Form>
                </div>
                <div className="modal-footer border-top-0 d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => this.setState({ OpenModal: false })}
                  >
                    Fermé
                  </button>
                  {this.state.status === "send" ? (
                    <button
                      type="button"
                      onClick={this.SendAdd}
                      className="btn btn-success"
                      // onClick={}
                    >
                      Envoyé
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={this.SendChange}
                    >
                      Modifier
                    </button>
                  )}
                </div>
              </div>
            </Modal>
          </>
        ) : null}
      </>
    );
  }
}

export default ProductsList;
