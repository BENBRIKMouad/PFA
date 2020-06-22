import React, { Component } from "react";
import { FaTimes } from "react-icons/fa";
import { ButtonGroup, Button } from "react-bootstrap";
import axios from "axios";
export class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item,
      quantity: this.props.item.quantity,
      totalprice: null,
    };
    this.handlesubItem = this.handlesubItem.bind(this);
    this.handleaddItem = this.handleaddItem.bind(this);
    this.handleTotalPrice = this.handleTotalPrice.bind(this);
    this.handledeleteItem = this.handledeleteItem.bind(this);
  }

  componentDidMount() {
    this.handleTotalPrice();
  }
  handleaddItem() {
    axios
      .post(`http://127.0.0.1:8000/api/add_to_cart/`, {
        pk: this.state.item.id,
        user: this.props.user,
      })
      .then((res) =>
        res.data
          ? this.setState((prevState) => {
              return {
                quantity: prevState.quantity + 1,
              };
            }, this.handleTotalPrice)
          : null
      )

      .catch((err) => console.log(err));
  }
  handlesubItem() {
    axios
      .post(`http://127.0.0.1:8000/api/remove_single_product_from_cart/`, {
        pk: this.state.item.id,
        user: this.props.user,
      })
      .then((res) =>
        res.data
          ? this.setState((prevState) => {
              return {
                quantity: prevState.quantity - 1,
              };
            }, this.handleTotalPrice)
          : null
      )

      .catch((err) => console.log(err));
  }

  handledeleteItem() {
    axios
      .post(`http://127.0.0.1:8000/api/remove_from_cart/`, {
        pk: this.state.item.id,
        user: this.props.user,
      })
      .then(this.props.quit())

      .catch((err) => console.log(err));
  }
  handleTotalPrice() {
    let itemprice = 0;
    if (this.state.item.discount_price > 0) {
      itemprice = this.state.item.discount_price;
    } else {
      itemprice = this.state.item.price;
    }
    this.setState({
      totalprice: itemprice * this.state.quantity,
    });
  }
  render() {
    // console.log(this.state);
    const { item } = this.state;
    return (
      <>
        <tr>
          <td className="w-25">
            <img
              src={item.photo}
              className="img-fluid img-thumbnail"
              alt={item.slug}
            />
          </td>
          <td>{item.title}</td>
          <td>
            {item.discount_price > 0 ? item.discount_price : item.price}
            DH
          </td>
          <td>
            <ButtonGroup aria-label="Basic example">
              {this.state.quantity >= 2 ? (
                <Button variant="secondary" onClick={this.handlesubItem}>
                  -
                </Button>
              ) : null}
              <input
                type="text"
                disabled={true}
                value={this.state.quantity}
                style={{ width: 50 }}
              />

              <Button variant="primary" onClick={this.handleaddItem}>
                +
              </Button>
            </ButtonGroup>
          </td>
          {/* <td className="qty">
            
            {this.state.quantity > 1 ? (
              <button onClick={this.handlesubItem}>-</button>
            ) : null}

            <span>{this.state.quantity}</span>
            <button onClick={this.handleaddItem}>+</button>
          </td> */}
          <td>{this.state.totalprice}</td>
          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={this.handledeleteItem}
            >
              <FaTimes />
            </button>
          </td>
        </tr>
      </>
    );
  }
}

export default ShoppingCart;
