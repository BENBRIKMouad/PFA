import React, { Component } from "react";
import { Container } from "react-bootstrap";
import ProductList from "./ProductList.jsx/ProductList";
import CarrouselComp from "./CarrouselComp/CarrouselComp";
import { connect } from "react-redux";
import { FcPrivacy, FcApproval, FcHome } from "react-icons/fc";

export class LandingPage extends Component {
  render() {
    return (
      <>
        <CarrouselComp />

        <section id="home-icons" className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4 mb-4 text-center">
                <FcHome size={100} />
                <h3>
                  <strong>Livraison a la maison</strong>
                </h3>
                <p>
                  Nos Livreurs s'assure que votre produit arrive a déstination
                </p>
              </div>
              <div className="col-md-4 mb-4 text-center">
                <FcPrivacy size={100} />
                <h3>
                  <strong>Sécurisé</strong>
                </h3>
                <p>Paiement 100 % sécurisé</p>
              </div>
              <div className="col-md-4 mb-4 text-center">
                <FcApproval size={100} />
                <h3>
                  <strong>Confinace</strong>
                </h3>
                <p>Déjà des millier de client nous font leur confiance</p>
              </div>
            </div>
          </div>
        </section>
        <Container>
          {" "}
          <ProductList />{" "}
        </Container>
        {/* <h1>{this.props.Number}</h1> */}
      </>
    );
  }
}

// const mapStateToProps = (state) => ({
//   Number: state.test,
// });

export default LandingPage;
