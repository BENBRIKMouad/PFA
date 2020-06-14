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
} from "react-icons/fa";
class AdminPannel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Products: [],
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
          Products: res.data,
        })
      )
      .then(console.log(this.state.Products))
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
                <button
                  className="btn btn-primary btn-block"
                  data-toggle="modal"
                  data-target="#addPostModal"
                >
                  <FaPlus className="mx-1" /> Ajouté Plat
                </button>
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
                      {this.state.Products.map((Product) => (
                        <tr key={Product.id}>
                          <td>{Product.id}</td>
                          <td>{Product.user_name}</td>
                          <td>
                            {Product.received ? (
                              <span className="text-success">Recu</span>
                            ) : (
                              <span className="text-danger"> Pas Recu</span>
                            )}
                          </td>
                          <td>{this.DateFix(Product.ordered_date)}</td>

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
                      <FaClipboardList />
                      Remboursement
                    </h3>
                    {/* <h4 className="display-4">
                      <i className="fas fa-pencil-alt"></i> 6
                    </h4> */}
                    <Link
                      to={`/Admin/RefundList`}
                      className="btn btn-outline-light btn-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>

                <div className="card text-center bg-success text-white mb-3">
                  <div className="card-body">
                    <h3>Plat</h3>
                    <h4 className="display-4">
                      <i className="fas fa-folder"></i> 4
                    </h4>
                    <a
                      href="categories.html"
                      className="btn btn-outline-light btn-sm"
                    >
                      View
                    </a>
                  </div>
                </div>

                <div className="card text-center bg-warning text-white mb-3">
                  <div className="card-body">
                    <h3>Users</h3>
                    <h4 className="display-4">
                      <i className="fas fa-users"></i> 4
                    </h4>
                    <a
                      href="users.html"
                      className="btn btn-outline-light btn-sm"
                    >
                      View
                    </a>
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
