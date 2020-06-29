import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.ID,
      data: {},
      isFetched: false,
      Info: {},
    };
    this.AddItem = this.AddItem.bind(this);
  }
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/api/ProductView/${this.state.id}`)
      .then(({ data }) => this.setState({ data: data, isFetched: true }))
      .catch((err) => console.log(err));
    if (this.props.isAuthenticated) {
      const token = localStorage.getItem("token");
      axios
        .post("http://127.0.0.1:8000/api/TokenView/", {
          token: token,
        })
        .then(({ data }) => this.setState({ Info: data }))
        .catch((err) => console.log(err));
    }
  }

  notify = () =>
    toast.success("Ajouté au Panier", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  AddItem() {
    axios
      .post(`http://127.0.0.1:8000/api/add_to_cart/`, {
        pk: this.state.id,
        user: this.state.Info.user,
      })
      .then((res) => (res.data ? this.notify() : null))

      .catch((err) => console.log(err));
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <br />
        <br />
        <ToastContainer />

        <Container>
          {this.state.isFetched ? (
            <>
              <div className="row">
                <div className="col-md-8">
                  <img
                    className="img-fluid"
                    src={this.state.data.photo}
                    alt={this.state.data.slug}
                  />
                </div>

                <div className="col-md-4">
                  <h1 className="display-5">{this.state.data.title}</h1>
                  <hr />
                  <p className="lead">{this.state.data.description}</p>
                  <h3 className="my-3">Suppléments</h3>
                  <ul>
                    {this.state.data.additional_items.length > 0 ? (
                      this.state.data.additional_items.map((item) => (
                        <li key={item.id}>
                          {item.title} : {item.price} DH
                        </li>
                      ))
                    ) : (
                      <li>Rien</li>
                    )}
                  </ul>
                  <h3 className="my-3 mr-2 d-inline-block">Prix :</h3>
                  {this.state.data.discount_price ? (
                    <span className="align-right">
                      <del className="text-muted">{this.state.data.price}</del>{" "}
                      <span className="text-danger font-weight-bold h3">
                        {this.state.data.discount_price}
                      </span>
                    </span>
                  ) : (
                    <span className=" h3">{this.state.data.price}</span>
                  )}{" "}
                  MAD
                  {this.props.isAuthenticated ? (
                    this.state.Info.is_admin ? null : (
                      <Button
                        variant="success"
                        onClick={this.AddItem}
                        className="btn-block "
                      >
                        Ajouter au panier
                      </Button>
                    )
                  ) : (
                    <Link
                      to="/SignIn"
                      className="btn btn-block btn-outline-dark"
                    >
                      {" "}
                      Connecte Toi
                    </Link>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

export default connect(mapStateToProps, null)(ProductDetail);
