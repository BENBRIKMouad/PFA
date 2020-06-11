import React, { Component } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
export class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/order/")
      .then(({ data }) => this.setState({ orders: data }))
      .catch((err) => console.log(err));
  }
  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <>
        <h1 className="display-1 text-center">Order list</h1>
        <hr />
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Remboursment</th>
                <th>Recu</th>
                <th>Utilisateur </th>
                <th>Produit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link to={`${this.props.match.path}/${order.id}`}>
                      {" "}
                      {order.id}
                    </Link>
                  </td>
                  <td>{order.status}</td>
                  <td>
                    {order.refund_requested ? (
                      <span>
                        Un Remboursemnt a été demander est il est{" "}
                        {order.refund_granted ? (
                          <span className="text-success">Accépter </span>
                        ) : (
                          <span>Refusser</span>
                        )}
                      </span>
                    ) : (
                      <span>Aucun Remboursment a été demandez</span>
                    )}
                  </td>
                  <td>
                    {order.received ? (
                      <span className="text-success"> Recu</span>
                    ) : (
                      <span className="text-danger"> Pas Recu</span>
                    )}
                  </td>
                  <td>{order.user}</td>
                  {order.products.length === 1 ? (
                    <td>{order.products}</td>
                  ) : (
                    <td>
                      {order.products.map((product) => (
                        <span key={product}>
                          {product} <br />
                        </span>
                      ))}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}

export default OrderList;
