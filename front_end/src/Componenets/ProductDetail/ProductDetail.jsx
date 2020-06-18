import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.ID,
      data: {},
    };
    this.AddItem = this.AddItem.bind(this);
  }
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/api/product/${this.state.id}`)
      .then(({ data }) => this.setState({ data: data }))
      .catch((err) => console.log(err));
  }

  AddItem() {
    axios
      .post(`http://127.0.0.1:8000/api/add_to_cart/`, { pk: 1 })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
  render() {
    console.log(this.props.match.params.ID);
    console.log(this.state.data);

    return (
      <React.Fragment>
        <br />
        <br />

        <Container>
          <h1 className="my-4">
            {this.state.data.title}
            <br />
            {/* this.state.data.discount_price > 0 */}
            {false ? (
              <small className="text-danger">Ce Produit est en Promo</small>
            ) : null}
          </h1>

          <div className="row">
            <div className="col-md-8">
              <img className="img-fluid" src={this.state.data.photo} alt="" />
            </div>

            <div className="col-md-4">
              <h3 className="my-3">Description :</h3>
              <p>{this.state.data.description}</p>
              <h3 className="my-3">Suppléments</h3>
              <ul>
                <li>Lorem Ipsum</li>
              </ul>
              <h3 className="my-3">Prix</h3>
            </div>
          </div>
          {this.props.isAuthenticated ? (
            <Button variant="primary" onClick={this.AddItem}>
              Ajouter au panier
            </Button>
          ) : (
            <Link to="/SignIn" replace>
              {" "}
              Connecte Toi
            </Link>
          )}
          {/*  <img
            src={this.state.data.photo}
            alt={this.state.data.slug}
            class="img-thumbnail float-left "
          ></img>
          <span className="display-3"> Description :</span>
          <p className="lead">{this.state.data.description}</p>
           */}
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
