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
    Alert
  } from "react-bootstrap";

import { login, getAuthStatus } from "../actions/auth.js";

class Login extends Component{

    state = {
      email: "",
      password: "",
      isLoggedIn: false,
      userType: null,
      error: null
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

      if (status != true){
        this.setState({error: status.message})
      }
      
    };

    render(){
      if (this.state.isLoggedIn && this.state.userType == 'user') return <Redirect to="/user/dashboard" />;
      if (this.state.isLoggedIn && this.state.userType == 'admin') return <Redirect to="/admin/dashboard" />;
        return(
    <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="6">
            <Card className="card-user">
            <div className="card-image">
                <img
                  alt="..."
                  src={
                    require("assets/img/new-blue-coronavirus-image.jpg")
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
                  <Row className="justify-content-md-center">
                    <Col className="pr-1" md="6">
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
                  <Row className="justify-content-md-center">
                    <Col className="pr-1" md="6">
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
                  <Row className="justify-content-md-center">
                  <Col className="pr-1" md="6">
                    {this.state.error ? (
                      <Alert variant='danger'>
                        LOGIN ERROR: {this.state.error}
                      </Alert>
                    ): (<div></div>)}
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center">
                  <Button
                    className="btn-fill pull-right"
                    variant="primary"
                    onClick={this.handleSubmit}
                  >
                    LOGIN
                  </Button>
                  {/* <Button
                    className="btn-fill pull-right"
                    variant="primary"
                    onClick={() => this.props.history.push("/signup")}
                  >
                    SIGN UP
                  </Button> */}
                  </Row>
                  <Row className='justify-content-center'>
                  {/* <Col className="pr-1" md="4"> */}
                  <a href="" onClick={() => this.props.history.push("/signup")}>
                    Don't have an account? Sign Up
                  </a>
                  {/* </Col> */}
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