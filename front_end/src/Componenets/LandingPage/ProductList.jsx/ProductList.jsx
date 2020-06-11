import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Products: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/product/")
      .then((res) =>
        this.setState({
          Products: res.data,
        })
      )
      .then(console.log(this.state.Products));
  }

  render() {
    const { Products } = this.state;
    return (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {Products.map((item) => (
          <div className="col my-4" key={item.id}>
            <Card>
              <Card.Img variant="top" src={item.photo} />
              <Card.Body>
                <Card.Title className="text-center">
                  <Link
                    className="text-reset text-decoration-none"
                    to={`/products/${item.id}`}
                  >
                    {item.title}
                  </Link>{" "}
                  <br />
                  {item.discount_price ? (
                    <span className="badge  badge-pill badge-danger ">
                      Promo
                    </span>
                  ) : null}
                </Card.Title>

                <Card.Text className="text-center overflow-auto">
                  {item.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                {item.discount_price ? (
                  <span className="align-right">
                    <del>{item.price}</del>{" "}
                    <span className="">{item.discount_price}</span>
                  </span>
                ) : (
                  <span>{item.price}</span>
                )}{" "}
                MAD
                {/* <Link
                  className="btn btn-primary ml-50"
                  to={`/products/${item.id}`}
                >
                  Details
                </Link> */}
              </Card.Footer>
            </Card>
            {console.log(item)}
          </div>
        ))}
      </div>
    );
  }
}
