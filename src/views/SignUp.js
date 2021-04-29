import React, {Component} from "react";
import Firebase, {db, provider} from '../firebase';
import { Redirect } from "react-router-dom";
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
  } from "react-bootstrap";

import { signUp } from "../actions/auth.js";

class SignUp extends Component{

    state = {
      firstname: "",
      lastname: "",
      contactno: "",
      email: "",
      password: "",
      isLoggedIn: false
    }

    componentDidMount() {
      Firebase.auth().onAuthStateChanged(user => {
        if (user) { this.setState({ isLoggedIn: true })} 
        else { this.setState({ isLoggedIn: false })}
      })
      console.log("user", this.state.isLoggedIn)
    }

    handleChange = e => {
      this.setState({
        [e.target.id]: e.target.value
      });
      console.log(this.state)
    };

    handleSubmit = async(e) => {
      e.preventDefault();
      console.log(this.state)

      var status = false;
      status = await signUp(this.state);
      console.log(status)
      console.log("user", this.state.isLoggedIn)
      
    };

    render(){
      if (this.state.isLoggedIn) return <Redirect to="/user" />;
        return(
    <Container>
        <Row>
          <Col md="6">
            <Card className="card-user">
            <div className="card-image">
                <img
                  alt="..."
                  src={
                    require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                      .default
                  }
                ></img>
              </div>
              {/* <Card.Header>
                <Card.Title as="h4">SignUp</Card.Title>
              </Card.Header> */}
              <Card.Body>
              <div className="author">
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/wc-logo.png").default}
                    ></img>
                    <h5 className="title">SIGNUP</h5>
                </div>
                <Form>
                <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          id="firstname"
                          defaultValue=""
                          placeholder="firstname"
                          type="text"
                          onChange = {this.handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                  <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          id="lastname"
                          defaultValue=""
                          placeholder="lastname"
                          type="text"
                          onChange = {this.handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                  <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Contact Number</label>
                        <Form.Control
                          id="lastname"
                          defaultValue=""
                          placeholder="+94xxxxxxxxx"
                          type="text"
                          onChange = {this.handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          id="email"
                          defaultValue=""
                          placeholder="example@weconnect.com"
                          type="email"
                          onChange = {this.handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          id="password"
                          defaultValue=""
                          placeholder="password"
                          type="password"
                          onChange = {this.handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    variant="info"
                    onClick={this.handleSubmit}
                  >
                    SIGN UP
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
        )
    }
}

export default SignUp;