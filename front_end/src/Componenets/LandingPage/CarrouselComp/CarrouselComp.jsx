import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
export default class CarrouselComp extends Component {
  render() {
    return (
      <Carousel controls={false} indicators={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.discordapp.com/attachments/641674843359674395/703289104280060214/ComponentTMP_0-image.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.discordapp.com/attachments/641674843359674395/703289104280060214/ComponentTMP_0-image.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.discordapp.com/attachments/641674843359674395/703289104280060214/ComponentTMP_0-image.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    );
  }
}
