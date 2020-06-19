import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
// import * as actions from "../../Store/Actions/auth";
// import styles from "./ProductList.module.css";

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Products: [],
    };
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/product/").then((res) =>
      this.setState({
        Products: res.data,
      })
    );
  }

  render() {
    const { Products } = this.state;
    return (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {Products.map((item) => (
          <div className="col my-4" key={item.id}>
            <Card className="shadow-lg mb-5 bg-white rounded">
              <Card.Img variant="top" src={item.photo} />
              <Card.Body>
                <Card.Title className="text-center">
                  <Link
                    className="text-reset text-decoration-none display-4"
                    to={`/Product/${item.id}`}
                  >
                    {item.title}
                  </Link>
                  <br />
                  {item.discount_price ? (
                    <span className="badge  badge-pill badge-danger ">
                      Promo
                    </span>
                  ) : (
                    <br />
                  )}
                </Card.Title>

                <Card.Text className="text-center overflow-auto lead">
                  {item.description}
                </Card.Text>
                <Card.Text className="text-right">
                  {item.discount_price ? (
                    <span className="align-right">
                      <del className="text-muted">{item.price}</del>{" "}
                      <span className="text-danger font-weight-bold h3">
                        {item.discount_price}
                      </span>
                    </span>
                  ) : (
                    <span className=" h3">{item.price}</span>
                  )}{" "}
                  MAD
                </Card.Text>
              </Card.Body>

              <div>
                <Link
                  to={
                    this.props.isAuthenticated
                      ? `/Product/${item.id}`
                      : "/SignIn"
                  }
                  className="btn btn-block  btn-success"
                >
                  Acheter
                </Link>
              </div>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

export default connect(mapStateToProps, null)(ProductList);
