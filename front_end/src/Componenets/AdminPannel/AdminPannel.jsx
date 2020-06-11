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
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/product/")
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
  render() {
    console.log(this.state);
    // console.log(this.props);
    return (
      <>
        {this.state.SelectedProduct.map((item) => (
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
        </Container>
      </>
    );
  }
}
export default AdminPannel;
