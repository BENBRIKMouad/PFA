import React, { Component } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
export class OrderOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: [],
      id: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/api/order/${this.props.match.params.ID}`)
      .then(({ data }) =>
        this.setState({
          order: data,
          id: this.props.match.params.ID,
          isLoading: false,
        })
      )
      .catch((err) => console.log(err));
  }
  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <>
        <h1 className="display-1 text-center">
          Order Num <span className="text-success">{this.state.id}</span>
        </h1>
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
              <tr key={this.state.order.id}>
                <td>{this.state.order.id}</td>
                <td>{this.state.order.status}</td>
                <td>
                  {this.state.order.refund_requested ? (
                    <span>
                      Un Remboursemnt a été demander est il est{" "}
                      {this.state.order.refund_granted ? (
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
                  {this.state.order.received ? (
                    <span className="text-success"> Recu</span>
                  ) : (
                    <span className="text-danger"> Pas Recu</span>
                  )}
                </td>
                <td>{this.state.order.user}</td>
                {console.log(this.state.order.products)}
                {this.state.isLoading ? (
                  <td>Loading</td>
                ) : this.state.order.products.length === 1 ? (
                  <td>{this.state.order.products}</td>
                ) : (
                  <td>
                    {this.state.order.products.map((product) => (
                      <span key={product}>
                        {product} <br />
                      </span>
                    ))}
                  </td>
                )}
              </tr>
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}

export default OrderOne;
