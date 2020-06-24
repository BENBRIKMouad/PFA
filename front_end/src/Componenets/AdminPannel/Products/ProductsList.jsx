import React, { Component } from "react";
import axios from "axios";
import { Container, Modal } from "react-bootstrap";
export class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Products: [],
      OpenModal: false,
      SelectedId: 1,
      // isFetched: false,
    };
    this.deleteProduct = this.deleteProduct.bind(this);
    this.ChangeProduct = this.ChangeProduct.bind(this);
  }
  ChangeProduct(term) {
    this.setState({ OpenModal: true, SelectedId: term });
  }

  deleteProduct(term) {
    axios
      .delete(`http://127.0.0.1:8000/api/product/${term}/`)
      .then((res) => console.log(res))
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
  render() {
    const { Products } = this.state;
    return (
      // {this.state.isFetched ? ()}
      <>
        <Modal
          show={this.state.OpenModal}
          onHide={() => this.setState({ showmodalPanier: false })}
          size="lg"
        >
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title" id="exampleModalLabel">
                Modifier
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
              <label>Nom</label>
              <input type="test" />
            </div>
            <div className="modal-footer border-top-0 d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => this.setState({ OpenModal: false })}
              >
                Fermé
              </button>
            </div>
          </div>
        </Modal>
        <h1 className="display-1 lead text-center">Listes de Produits</h1>
        <hr />
        <Container>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>photo</th>
                <th>Nom :</th>
                <th>Prix</th>
                <th> Produit additionel</th>
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
                        <>
                          <span className="text-success">
                            {add_product.title}
                          </span>
                          <span className="text-success">
                            {add_product.price}
                          </span>
                        </>
                      ))
                    ) : (
                      <span className="text-danger"> L9adia 7amda</span>
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
                    <button onClick={() => this.ChangeProduct(Product.id)}>
                      modifier
                    </button>{" "}
                    {/* <button>supprimer</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </>
    );
  }
}

export default ProductsList;
