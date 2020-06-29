import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaPlus,
  FaCog,
  FaAngleDoubleRight,
  FaUsers,
  FaArrowLeft,
} from "react-icons/fa";
class AdminPannel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Orders: [],
      modalDetailOpened: false,
      SelectedOrder: {},
    };
    this.DateFix = this.DateFix.bind(this);
  }

  componentDidMount() {
    axios
      .post("http://127.0.0.1:8000/api/OrderView/", {})
      .then((res) =>
        this.setState({
          Orders: res.data,
        })
      )
      // .then(console.log(this.state.Orders))
      .catch((err) => console.log(err));
  }
  ModalHandler = async (term) => {
    console.log(term);
    this.setState({ SelectedOrder: term, modalDetailOpened: true });
  };
  DateFix(x) {
    var Newdate = new Date(x);

    return Newdate.toLocaleString();
  }
  render() {
    console.log(this.state.Orders);
    return (
      <>
        <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <FaCog /> Dashboard
                </h1>
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
        <section id="posts">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header">
                    <h4>Liste des Commandes</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Client</th>
                        <th>Récéption</th>
                        <th>Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.Orders.map((Order) => (
                        <tr key={Order.id}>
                          <td>
                            <span className="pill"></span>
                            <div type="button" className="btn btn-primary">
                              id:{" "}
                              <span className="badge badge-light">
                                {Order.id}
                              </span>
                            </div>
                          </td>
                          <td>{Order.user_name}</td>
                          <td>
                            {Order.received ? (
                              <span className="text-success">Recu</span>
                            ) : (
                              <span className="text-danger"> Pas Recu</span>
                            )}
                          </td>
                          <td>{this.DateFix(Order.ordered_date)}</td>

                          <td>
                            <Button
                              onClick={() => this.ModalHandler(Order)}
                              className="btn btn-secondary"
                            >
                              <FaAngleDoubleRight className="m-1" /> Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center bg-primary text-white mb-3">
                  <div className="card-body">
                    <h3>
                      <span className="display-4">
                        <FaClipboardList />
                      </span>
                      Remboursement
                    </h3>

                    <Link
                      to={`/Admin/RefundList`}
                      className="btn btn-outline-light btn-sm"
                    >
                      Consulter
                    </Link>
                  </div>
                </div>
                <div className="card text-center bg-success text-white mb-3">
                  <div className="card-body">
                    <h3>
                      <span className="display-4">
                        <FaClipboardList />
                      </span>
                      <br />
                      Plats
                    </h3>

                    <Link
                      to={`/Admin/ProductList`}
                      className="btn btn-outline-light btn-sm"
                    >
                      Consulter
                    </Link>
                  </div>
                </div>
                <div className="card text-center bg-warning text-white mb-3">
                  <div className="card-body">
                    <h3>
                      <span className="display-4">
                        <FaUsers />
                      </span>
                      <br />
                      Client
                    </h3>

                    <Link
                      to={`/Admin/ClientList`}
                      className="btn btn-outline-light btn-sm"
                    >
                      Consulter
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
      </>
    );
  }
}
export default AdminPannel;
