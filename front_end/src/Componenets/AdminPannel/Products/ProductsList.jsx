import React, { Component } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
export class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Products: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/ProductView/")
      .then(({ data }) => this.setState({ Products: data }))
      .catch((err) => console.log(err));
  }
  render() {
    const { Products } = this.state;
    return (
      <>
        <h1 className="display-1">ProductsList</h1>
        <hr />
        <Container>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>photo</th>
                <th>Title</th>
                <th>price</th>
                <th>Additional Item</th>
              </tr>
            </thead>
            <tbody>
              {Products.map((Product) => (
                <tr key={Product.id}>
                  <td>{Product.id}</td>

                  <td>{Product.photo}</td>

                  <td>{Product.title}</td>
                  <td>{Product.price}</td>

                  <td>
                    {Product.additional_items.length > 0 ? (
                      Product.additional_items.map((add_product) => (
                        <>
                          <span className="text-success">
                            {add_product.title}
                          </span>
                          <span className="text-success">
                            {add_product.price}
                          </span>
                        </>
                      ))
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

export default ProductsList;
