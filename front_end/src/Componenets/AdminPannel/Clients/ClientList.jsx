import React, { Component } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
export class ClientList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Clients: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/ClientView/")
      .then(({ data }) => this.setState({ Clients: data }))
      .catch((err) => console.log(err));
  }
  render() {
    const { Clients } = this.state;
    return (
      <>
        <h1 className="display-1">ClientList</h1>
        <hr />
        <Container>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>UserName</th>
                <th>address</th>
                <th>city</th>
                <th>amount</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {Clients.map((Client) => (
                <tr key={Client.id}>
                  <td>{Client.id}</td>

                  <td>{Client.user_name}</td>
                  <td>{Client.address}</td>
                  <td>{Client.city}</td>

                  <td>
                    {Client.amount > 0 ? (
                      <span className="text-success">{Client.amount}</span>
                    ) : (
                      <span className="text-danger"> L9adia 7amda</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </>
    );
  }
}

export default ClientList;
