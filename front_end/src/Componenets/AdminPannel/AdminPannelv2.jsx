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
    this.EditProduct = this.EditProduct.bind(this);
    this.InfoProduct = this.InfoProduct.bind(this);
    this.DeleteProduct = this.DeleteProduct.bind(this);
    this.suppresedProduct = this.suppresedProduct.bind(this);
    this.DateFix = this.DateFix.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/OrderDetail")
      .then((res) =>
        this.setState({
          Products: res.data,
        })
      )
      .then(console.log(this.state.Products))
      .catch((err) => console.log(err));
  }

  InfoProduct(id) {
    this.setState({
      SelectedProduct: this.state.Products.filter((item) => item.id === id),
      showModalInfo: true,
    });
  }

  EditProduct(id) {}
  DeleteProduct(id) {
    this.setState({
      SelectedProduct: this.state.Products.filter((item) => item.id === id),
      showModalDelete: true,
    });
  }
  suppresedProduct(item) {
    console.log(item);
    axios
      .delete(`http://127.0.0.1:8000/api/product/${item.id}`, item)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  DateFix(x) {
    console.log(x);

    var Newdate = new Date(x);

    return Newdate.toLocaleString();
  }
  render() {
    console.log(this.state);
    console.log(this.props);
    // const date = new Date();
    // console.log(date);

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
                <a
                  href="#"
                  className="btn btn-primary btn-block"
                  data-toggle="modal"
                  data-target="#addPostModal"
                >
                  <FaPlus className="mx-1" /> Ajouté Plat
                </a>
              </div>
              <div className="col-md-3">
                <a
                  href="#"
                  className="btn btn-success btn-block"
                  data-toggle="modal"
                  data-target="#addCategoryModal"
                >
                  <FaPlus className="mx-1" /> Ajouté Sous_Plat
                </a>
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

        <div class="modal fade" id="addPostModal">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-primary text-white">
                <h5 class="modal-title">Add Post</h5>
                <button class="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="category">Category</label>
                    <select class="form-control">
                      <option value="">Web Development</option>
                      <option value="">Tech Gadgets</option>
                      <option value="">Business</option>
                      <option value="">Health & Wellness</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="image">Upload Image</label>
                    <div class="custom-file">
                      <input type="file" class="custom-file-input" id="image" />
                      <label for="image" class="custom-file-label">
                        Choose File
                      </label>
                    </div>
                    <small class="form-text text-muted">Max Size 3mb</small>
                  </div>
                  <div class="form-group">
                    <label for="body">Body</label>
                    <textarea name="editor1" class="form-control"></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button class="btn btn-primary" data-dismiss="modal">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="addCategoryModal">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-success text-white">
                <h5 class="modal-title">Add Category</h5>
                <button class="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button class="btn btn-success" data-dismiss="modal">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="addUserModal">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-warning text-white">
                <h5 class="modal-title">Add User</h5>
                <button class="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="password2">Confirm Password</label>
                    <input type="password" class="form-control" />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button class="btn btn-warning" data-dismiss="modal">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* {this.state.SelectedProduct.map((item) => (
          <React.Fragment key={item.id}>
            <Modal
              show={this.state.showModalInfo}
              onHide={() => this.setState({ showModalInfo: false })}
              animation={true}
            >
              <Modal.Header closeButton>
                <Modal.Title>{item.title}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {" "}
                <img
                  src={item.photo}
                  className=" img-thumbnail rounded "
                  alt={item.slug}
                />{" "}
                <br />
                Description : <br />
                {item.description} <br />
                {item.discount_price ? (
                  <React.Fragment>
                    Le Produit est en <span className="text-danger">Promo</span>{" "}
                    <br />
                    Prix Originale : {item.price} <br /> Prix De Promo :
                    {item.discount_price} <br />{" "}
                  </React.Fragment>
                ) : (
                  <React.Fragment>Prix : {item.price}</React.Fragment>
                )}
                Description : <br />
                {item.description}
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ showModalInfo: false })}
                >
                  Fermé
                </Button>
              </Modal.Footer>
            </Modal>
          </React.Fragment>
        ))}

        {this.state.SelectedProduct.map((item) => (
          <React.Fragment key={item.id}>
            <Modal
              show={this.state.showModalDelete}
              onHide={() => this.setState({ showModalDelete: false })}
              animation={true}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  <span className="text-danger">Sppresion </span>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Etes Vous sur de Vouloir supprimer {item.title}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ showModalDelete: false })}
                >
                  Close
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => this.suppresedProduct(item)}
                >
                  Spprimer
                </Button>
              </Modal.Footer>
            </Modal>
          </React.Fragment>
        ))}

        <Container>
          <Link
            to={`${this.props.match.path}/addProducts`}
            className="btn btn-success m-2 "
          >
            {" "}
            <FaPlus className="mx-1" /> Ajouter un Produit
          </Link>
          <Link
            to={`${this.props.match.path}/AdditionalItem`}
            className="btn btn-success m-2 "
          >
            {" "}
            <FaPlus className="mx-1" /> Produit Additionel
          </Link>
          <Link
            to={`${this.props.match.path}/RefundList`}
            className="btn btn-success m-2 "
          >
            {" "}
            <FaClipboardList className="mx-1" /> Consulter les remboursement
          </Link>
          <Link
            to={`${this.props.match.path}/OrderList`}
            className="btn btn-success m-2 "
          >
            {" "}
            <FaClipboardList className="mx-1" /> Consulter les Order
          </Link>

          <hr />
          <h3> Product List</h3>
          <Table striped bordered responsive="md">
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Prix</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Products.map((Product) => (
                <tr key={Product.id}>
                  <td>{Product.id}</td>
                  <td>{Product.title}</td>
                  <td>{Product.price}</td>
                  <td>
                    <Button
                      variant="success"
                      className="m-2"
                      onClick={() => this.EditProduct(Product.id)}
                    >
                      <FaPen className="mx-2" />
                      Edit
                    </Button>
                    <Button
                      variant="primary"
                      className="m-2"
                      onClick={() => this.InfoProduct(Product.id)}
                    >
                      <FaQuestionCircle className="mx-2" />
                      info
                    </Button>
                    <Button
                      variant="danger"
                      className="m-2"
                      onClick={() => this.DeleteProduct(Product.id)}
                    >
                      <FaTrash className="mx-2" />
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container> */}
      </>
    );
  }
}
export default AdminPannel;
