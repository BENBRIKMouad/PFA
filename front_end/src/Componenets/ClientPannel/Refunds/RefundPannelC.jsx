import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
class RefundPannelC extends Component {
  render() {
    return (
      <>
        <Container>
          <h1 className="display-1 text-center">Refund pannel</h1>
          <Form>
            <Form.Group>
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
          </Form>
          <Button variant="success">Envoyer</Button>
        </Container>
      </>
    );
  }
}

export default RefundPannelC;
