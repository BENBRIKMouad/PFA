import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaAngleDoubleRight } from "react-icons/fa";
export class ClientPannl extends Component {
  state = {
    Info: {},
    isFetched: false,
  };
  componentDidMount() {
    axios
      .post("http://127.0.0.1:8000/api/OrderView/", {
        pk: this.props.match.params.ID,
        ordered: "True",
      })
      .then(({ data }) => this.setState({ Info: data, isFetched: true }));
    // .then(this.setState({ }));
  }
  DateFix = (x) => {
    var Newdate = new Date(x);

    return Newdate.toLocaleString();
  };
  render() {
    console.log(this.state);
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
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <Link to="/" className="btn btn-light btn-block">
                  <FaArrowLeft className="mx-1" /> Retour a la Boutique
                </Link>
              </div>
            </div>
          </div>
        </section>
        {this.state.isFetched ? (
          <section id="posts">
            <div className="container">
              <div className="row">
                <div className="col-md-9">
                  <div className="card">
                    <div className="card-header">
                      <h4>
                        Liste des Commandes{" "}
                        <span className="h6">
                          {" "}
                          ({this.state.Info.length} Commandes)
                        </span>
                      </h4>{" "}
                    </div>
                    <table className="table table-striped">
                      <thead className="thead-dark">
                        <tr>
                          <th>#</th>
                          <th>RéfCode</th>
                          <th>Date</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.Info.map((Commande) => (
                          <tr key={Commande.id}>
                            <td>
                              <span className="pill"></span>
                              <div type="button" className="btn btn-primary">
                                id:{" "}
                                <span className="badge badge-light">
                                  {Commande.id}
                                </span>
                              </div>
                            </td>
                            <td>{Commande.ref_code}</td>
                            <td>{this.DateFix(Commande.ordered_date)}</td>

                            <td>
                              <Link
                                to={`${this.props.match.path}/RefundList`}
                                className="btn btn-secondary"
                              >
                                <FaAngleDoubleRight className="m-1" /> Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* <Link to={`/Client/${this.props.match.params.ID}/Refund`}>
          Demander Un remboursement
        </Link> */}
      </>
    );
  }
}

export default ClientPannl;
