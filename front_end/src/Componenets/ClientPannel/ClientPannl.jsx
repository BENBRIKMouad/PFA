import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
export class ClientPannl extends Component {
  async componentDidMount() {
    const response = await Axios.get("");
  }
  render() {
    return (
      <>
        <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>Panneau Client</h1>
              </div>
            </div>
          </div>
        </header>

        {/* <Link to={`/Client/${this.props.match.params.ID}/Refund`}>
          Demander Un remboursement
        </Link> */}
      </>
    );
  }
}

export default ClientPannl;
