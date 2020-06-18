import React, { Component } from "react";
import { Container, Button, Table, Modal } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaTrash,
  FaPen,
  FaQuestionCircle,
  FaClipboardList,
  FaPlus,
  FaCog,
  FaAngleDoubleRight,
  FaUsers,
} from "react-icons/fa";
class AdminPannel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Orders: [],
      SelectedProduct: [],
      showModalInfo: false,
      showModalDelete: false,
    };
    this.DateFix = this.DateFix.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/OrderView")
      .then((res) =>
        this.setState({
          Orders: res.data,
        })
      )
      .then(console.log(this.state.Orders))
      .catch((err) => console.log(err));
  }

  DateFix(x) {
    var Newdate = new Date(x);

    return Newdate.toLocaleString();
  }
  render() {
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
                <Link
                  to="/admin/AddProducts"
                  className="btn btn-primary btn-block"
                >
                  <FaPlus className="mx-1" /> Ajouté Plat
                </Link>
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-success btn-block"
                  data-toggle="modal"
                  data-target="#addCategoryModal"
                >
                  <FaPlus className="mx-1" /> Ajouté Sous_Plat
                </button>
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
                          <td>{Order.id}</td>
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
                            <Link
                              to={`${this.props.match.path}/RefundList`}
                              className="btn btn-secondary"
                            >
                              <FaAngleDoubleRight className="m-1" /> Details
                            </Link>
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
      </>
    );
  }
}
export default AdminPannel;
