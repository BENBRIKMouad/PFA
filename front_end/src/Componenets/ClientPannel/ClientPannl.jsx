import React, { Component } from "react";
import { Link } from "react-router-dom";
export class ClientPannl extends Component {
  render() {
    console.log(this.props);
    return (
      <>
        <Link to={`/Client/${this.props.match.params.ID}/Refund`}>
          Demander Un remboursement
        </Link>
      </>
    );
  }
}

export default ClientPannl;
