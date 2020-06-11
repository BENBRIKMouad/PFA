import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./Componenets/LandingPage/LandingPage";
import SignUp from "./Componenets/SignUp/SignUp";
import SignIn from "./Componenets/SignIn/SignIn";
import ProductDetail from "./Componenets/ProductDetail/ProductDetail";
import NavBarComp from "./Componenets/NavBarComp/NavBarComp";
import ErrorPage from "./Componenets/Error/ErrorPage";
// import { connect } from "react-redux";
// import * as actions from "./Store/Actions/auth";
import AdminPannel from "./Componenets/AdminPannel/AdminPannel";
import AddProduct from "./Componenets/AdminPannel/AddProduct";
import RefundPannel from "./Componenets/AdminPannel/Refunds/RefundPannel";
import OrderList from "./Componenets/AdminPannel/Orders/OrderList";
import OrderOne from "./Componenets/AdminPannel/Orders/OrderOne";
import ClientPannel from "./Componenets/ClientPannel/ClientPannl";
import RefundPannelC from "./Componenets/ClientPannel/Refunds/RefundPannelC";
class App extends Component {
  // componentDidMount() {
  //   this.props.onTryAutoSignup();
  // }
  render() {
    // console.log(this.state.products);

    return (
      <>
        <Router>
          <NavBarComp />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/SignIn" component={SignIn} />
            <Route exact path="/Product/:ID" component={ProductDetail} />
            <Route exact path="/Admin" component={AdminPannel} />
            <Route exact path="/Admin/AddProducts" component={AddProduct} />
            <Route exact path="/Admin/RefundList" component={RefundPannel} />
            <Route exact path="/Admin/OrderList" component={OrderList} />
            <Route exact path="/Admin/OrderList/:ID" component={OrderOne} />
            <Route exact path="/Client/:ID" component={ClientPannel} />
            <Route exact path="/Client/:ID/Refund" component={RefundPannelC} />

            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {s
//     isAuthenticated: state.token !== null,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTryAutoSignup: () => dispatch(actions.authCheckState()),
//   };
// };
export default App;
// export default connect(mapStateToProps, mapDispatchToProps)(App);
