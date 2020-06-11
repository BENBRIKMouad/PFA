import React, { Component } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
export class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      refunds: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/order/")
      .then(({ data }) => this.setState({ orders: data }))
      .catch((err) => console.log(err));
    axios
      .get("http://127.0.0.1:8000/api/refund/")
      .then(({ data }) => this.setState({ refunds: data, isLoading: false }))
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
              {this.state.isLoading ? (
                <tr>
                  <td>Loading</td>
                </tr>
              ) : null}

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
                    {this.state.refunds.map((refund) =>
                      order.id === refund.order ? (
                        refund.in_queue ? (
                          <span className="text-warning">attente</span>
                        ) : refund.accepted ? (
                          <span className="text-success">Accepter</span>
                        ) : (
                          <span className="text-danger">Annulé</span>
                        )
                      ) : null
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
{
  /* {order.refund_requested ? (
                      <span>
                        Un Remboursemnt a été demander est il est{" "}
                        {order.refund_granted ? (
                          <span className="text-success">Accépter </span>
                        ) : (
                          <span>Refuser</span>
                        )}
                      </span>
                    ) : (
                      <span>Aucun Remboursment a été demandez</span>
                    )} */
}
