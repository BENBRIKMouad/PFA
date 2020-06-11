import React, { Component } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
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
                <th>Slot 1</th>
                <th>Slot 2</th>
                <th>Slot 3</th>
                <th>Slot 4</th>
                <th>Slot 5</th>
                <th>Slot 6</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.order_date}</td>
                  <td>{order.ref_code}</td>
                  <td>{order.received}</td>
                  <td>{order.refund_requested}</td>
                  <td>{order.refund_granted}</td>
                  {order.products.length === 1 ? (
                    <td>{order.products}</td>
                  ) : (
                    <td>Multi pRODUCTS</td>
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
