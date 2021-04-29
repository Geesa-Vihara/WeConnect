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

import { login, getAuthStatus } from "../actions/auth.js";

class Login extends Component{

    state = {
      email: "",
      password: "",
      isLoggedIn: false,
      userType: null
    }

    constructor(props) {
      super(props);
    }

    componentDidMount() {
      // const authStatus =  getAuthStatus()
      // if(authStatus){
      //   this.setState({ isLoggedIn: true })
      // }
      // else{
      //   this.setState({ isLoggedIn: false })
      // }
      Firebase.auth().onAuthStateChanged(async (user) => {
        if (user) { 
          console.log(user.uid)
          const ref = db.collection('admins').doc(user.uid);
          const doc = await ref.get();
          var type = null
          if (doc.exists) {
              console.log('admin');
              type = 'admin'
          } else {
              console.log('user');
              type = 'user'
          }
          this.setState({ isLoggedIn: true , userType: type})
        } 
        else { 
          this.setState({ isLoggedIn: false, userType: null })
        }
      })
      console.log("user", this.state.isLoggedIn, this.state.userType)
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
      status = await login(this.state);
      console.log(status)
      console.log("user", this.state.isLoggedIn)
      
    };

    render(){
      if (this.state.isLoggedIn && this.state.userType == 'user') return <Redirect to="/user" />;
      if (this.state.isLoggedIn && this.state.userType == 'admin') return <Redirect to="/admin" />;
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
                <Card.Title as="h4">Login</Card.Title>
              </Card.Header> */}
              <Card.Body>
              <div className="author">
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/wc-logo.png").default}
                    ></img>
                    <h5 className="title">LOGIN</h5>
                </div>
                <Form>
                  <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          id="email"
                          defaultValue=""
                          placeholder="Email"
                          type="email"
                          onChange = {this.handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          id="password"
                          defaultValue=""
                          placeholder="Password"
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
                    LOGIN
                  </Button>
                  {/* <Button
                    className="btn-fill pull-right"
                    variant="info"
                    onClick={() => this.props.history.push("/signup")}
                  >
                    SIGN UP
                  </Button> */}
                  <Row>
                  <Col className="pr-1" md="12">
                  <a href="#pablo" onClick={() => this.props.history.push("/signup")}>
                    Don't have an account? Sign Up
                  </a>
                  </Col>
                  </Row>
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

export default Login;