import React, { Component } from "react";
import axios from "axios";
import { Dropdown, Container, Table } from "react-bootstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
class RefundPannel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refundList: [],
      SelectedItem: [],
      option: [
        { value: true, label: "Accepter" },
        { value: false, label: "Annulé" },
        { value: "hold", label: "attente" },
      ],
      isLoading: true,
      vide: true,
    };
    this.debugItem = this.debugItem.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/refund/")
      .then(({ data }) => this.setState({ refundList: data, isLoading: false }))
      .catch((err) => console.log(err));
  }

  debugItem(e) {
    if (e == null) {
      this.setState({
        SelectedItem: [],
        vide: true,
      });
    } else if (e.value === "hold") {
      this.setState({
        SelectedItem: this.state.refundList.filter(
          (element) => element.in_queue === true
        ),
        vide: false,
      });
    } else {
      this.setState({
        SelectedItem: this.state.refundList.filter(
          (element) => element.accepted === e.value
        ),
        vide: false,
      });
    }
  }
  output = () => {
    if (this.state.SelectedItem.length === 0 && this.state.vide === true) {
      return this.state.refundList.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>
            <Link to={`/Admin/OrderList/${item.order}`}> {item.order}</Link>
          </td>
          <td>{item.reason}</td>
          <td>
            {item.accepted ? (
              <span className="text-success">Accepter</span>
            ) : (
              <span className="text-danger">Annulé</span>
            )}
          </td>
        </tr>
      ));
    } else {
      return this.state.SelectedItem.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>
            <Link to={`/Admin/OrderList/${item.order}`}>{item.order}</Link>
          </td>
          <td>{item.reason}</td>
          <td>
            {item.accepted ? (
              <span className="text-success">Accepter</span>
            ) : (
              <span className="text-danger">Annulé</span>
            )}
          </td>
        </tr>
      ));
    }
  };
  render() {
    console.log(this.state);
    return (
      <>
        <Container>
          <h1 className="display-1 text-center">Refund Pannel</h1>
          <Select
            options={this.state.option}
            isClearable={true}
            className="m-3"
            onChange={this.debugItem}
            isLoading={this.state.isLoading}
          />

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Order</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{this.output()}</tbody>
          </Table>
        </Container>
      </>
    );
  }
}
export default RefundPannel;
