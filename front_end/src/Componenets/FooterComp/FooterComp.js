import React, { Component } from "react";

export class FooterComp extends Component {
  render() {
    return (
      <>
        <footer id="main-footer" className="bg-dark text-white mt-5 p-5">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="lead text-center">
                  Copyright &copy;
                  <span id="year">2020</span>
                  <span className="text-warning"> My</span>
                  <span className="text-success">Food</span>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default FooterComp;
