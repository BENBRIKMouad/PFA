import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaAngleDoubleRight } from "react-icons/fa";
import { Modal } from "react-bootstrap";
export class ClientPannl extends Component {
  state = {
    Info: {},
    isFetched: false,
    modalDetailOpened: false,
    SelectedOrder: {},
  };
  componentDidMount() {
    axios
      .post("http://127.0.0.1:8000/api/OrderView/", {
        pk: this.props.match.params.ID,
        ordered: "True",
      })
      .then(({ data }) => this.setState({ Info: data, isFetched: true }));
  }
  DateFix = (x) => {
    var Newdate = new Date(x);

    return Newdate.toLocaleString();
  };
  ModalHandler = async (term) => {
    console.log(term);
    this.setState({ SelectedOrder: term, modalDetailOpened: true });
  };
  render() {
    console.log(this.state);
    return (
      <>
        <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>Panneau Client</h1>
              </div>
            </div>
          </div>
        </header>
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <Link to="/" className="btn btn-light btn-block">
                  <FaArrowLeft className="mx-1" /> Retour a la Boutique
                </Link>
              </div>
            </div>
          </div>
        </section>
        {this.state.isFetched ? (
          <section id="posts">
            <div className="container">
              <div className="row">
                <div className="col-md-9">
                  <div className="card">
                    <div className="card-header">
                      <h4>
                        Liste des Commandes{" "}
                        <span className="h6">
                          {" "}
                          ({this.state.Info.length} Commandes)
                        </span>
                      </h4>{" "}
                    </div>
                    <table className="table table-striped">
                      <thead className="thead-dark">
                        <tr>
                          <th>#</th>
                          <th>RéfCode</th>
                          <th>Date</th>
                          <th>Prix </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.Info.map((Commande) => (
                          <tr key={Commande.id}>
                            <td>
                              <span className="pill"></span>
                              <div type="button" className="btn btn-primary">
                                id:{" "}
                                <span className="badge badge-light">
                                  {Commande.id}
                                </span>
                              </div>
                            </td>
                            <td>{Commande.ref_code}</td>
                            <td>{this.DateFix(Commande.ordered_date)}</td>
                            <td>{Commande.price} MAD</td>
                            <td>
                              <button
                                onClick={() => this.ModalHandler(Commande)}
                                className="btn btn-secondary"
                              >
                                <FaAngleDoubleRight className="m-1" /> Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}
        {this.state.modalDetailOpened ? (
          <>
            <Modal
              show={this.state.modalDetailOpened}
              onHide={() => this.setState({ modalDetailOpened: false })}
              size="lg"
            >
              <div className="modal-content">
                <div className="modal-header border-bottom-0">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Commande {this.state.SelectedOrder.id}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => this.setState({ modalDetailOpened: false })}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Prix Total</th>
                        <th>Statut récéprion</th>
                      </tr>
                    </thead>
                    <tbody>
                      <td>{this.state.SelectedOrder.id}</td>
                      <td>
                        {this.DateFix(this.state.SelectedOrder.ordered_date)}
                      </td>
                      <td> {this.state.SelectedOrder.price}</td>
                      <td>
                        {this.state.SelectedOrder.received
                          ? "recu"
                          : "pas recu"}
                      </td>
                    </tbody>
                  </table>

                  <span className="lead m-2">Produit : </span>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Photo</th>
                        <th>Nom</th>
                        <th>Quantité </th>
                        <th> Prix Individuelle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.SelectedOrder.product.map((prod) => (
                        <tr>
                          <td>
                            <img
                              src={prod.photo}
                              alt={prod.slug}
                              className="img-thumbnail "
                            />
                          </td>
                          <td>{prod.title}</td>
                          <td>{prod.quantity}</td>
                          <td>{prod.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer border-top-0 d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => this.setState({ modalDetailOpened: false })}
                  >
                    Fermé
                  </button>
                </div>
              </div>
            </Modal>
          </>
        ) : null}
        {/* <Link to={`/Client/${this.props.match.params.ID}/Refund`}>
          Demander Un remboursement
        </Link> */}
      </>
    );
  }
}

export default ClientPannl;
