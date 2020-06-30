import React, { Component } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
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
        { value: "attente", label: "attente" },
      ],
      isLoading: true,
      Selected: null,
    };

    this.debugItem = this.debugItem.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/RefundView/")
      .then(({ data }) => this.setState({ refundList: data, isLoading: false }))
      .catch((err) => console.log(err));
  }

  debugItem(e) {
    if (e == null) {
      this.setState({
        SelectedItem: [],
        Selected: null,
      });
    } else if (e.value === "attente") {
      this.setState({
        SelectedItem: this.state.refundList.filter(
          (element) => element.in_queue === true
        ),
        Selected: "attente",
      });
    } else if (e.value === true) {
      this.setState({
        SelectedItem: this.state.refundList.filter(
          (element) =>
            element.accepted === e.value && element.in_queue === false
        ),
        Selected: "accepter",
      });
    } else if (e.value === false) {
      this.setState({
        SelectedItem: this.state.refundList.filter(
          (element) =>
            element.accepted === e.value && element.in_queue === false
        ),
        Selected: "annuler",
      });
    }
  }
  output = () => {
    if (this.state.Selected === null) {
      if (this.state.refundList.length === 0) {
        return (
          <tr>
            <td>Aucun Remboursment en Cours</td>
          </tr>
        );
      } else {
        return this.state.refundList.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.order}</td>
            <td>{item.reason}</td>
            <td>
              {item.in_queue ? (
                <span className="text-warning">attente</span>
              ) : item.accepted ? (
                <span className="text-success">Accepter</span>
              ) : (
                <span className="text-danger">Annulé</span>
              )}
            </td>
          </tr>
        ));
      }
    } else {
      return this.state.SelectedItem.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.order}</td>
          <td>{item.reason}</td>
          <td>
            {item.in_queue ? (
              <span className="text-warning">attente</span>
            ) : item.accepted ? (
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
        <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>Refund Pannel</h1>
              </div>
            </div>
          </div>
        </header>
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

            <tbody>
              {this.state.isLoading ? (
                <tr>
                  <td>Loading</td>
                </tr>
              ) : (
                this.output()
              )}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}
export default RefundPannel;
