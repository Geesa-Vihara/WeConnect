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

import { signUp } from "../actions/auth.js";

class SignUp extends Component{

    state = {
      firstname: "",
      lastname: "",
      contactno: "",
      district: "",
      email: "",
      password: "",
      isLoggedIn: false,
      formErrors: {
        firstname: null,
        lastname: null,
        contactno: null,
        district:null,
        email: null,
        password: null
      },
      formValid: null,
      error: null
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
      this.validateField(e.target.id, e.target.value)
    };

    handleSubmit = async(e) => {
      e.preventDefault();
      console.log(this.state)
      let valid = this.validateForm()
      console.log('validate', valid)

      if(valid){
        console.log('valid form')
        var status = false;
        status = await signUp(this.state);
        console.log(status)
        console.log("user", this.state.isLoggedIn)
        if (status != true){
          this.setState({error: status.message})
        }
      }
      else{
        console.log('invalid form')
      }
      
    };

    validateField = (fieldName, value) => {
      let fieldValidationErrors = this.state.formErrors;
      let vauleValid = false;
    
      switch(fieldName) {
        case 'contactno':
          vauleValid = value.match(/^[+]94[0-9]{9}$/i);
          fieldValidationErrors.contactno = vauleValid ? null : ' invalid contact number (expected format : +94XXXXXXXXX)';
          break;
        case 'email':
          vauleValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fieldValidationErrors.email = vauleValid ? null : ' invalid email address';
          console.log('validate email', vauleValid)
          break;
        case 'password':
          vauleValid = value.length >= 6;
          fieldValidationErrors.password = vauleValid ? null : ' password should be at least 6 characters long';
          console.log('validate pass', vauleValid)
          break;
        default:
          vauleValid = value.length >= 1;
          fieldValidationErrors[fieldName] = vauleValid ? null : ' required field';
          break;
      }
      this.setState({formErrors: fieldValidationErrors});
    }
    
    validateForm = () => {
      let fieldValidationErrors = this.state.formErrors;
      let formValid = true;
      let formFields = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        district: this.state.district,
        contactno: this.state.contactno,
        email: this.state.email,
        password: this.state.password
      }
      for (var key in formFields) {
        if (formFields[key] == ''){
          fieldValidationErrors[key] = ' required field'
          formValid = false;
          console.log('not valid key', key)
        }
      }
      this.setState({formErrors: fieldValidationErrors});
      // if(!this.state.firstname || !this.state.lastname || !this.state.district  || !this.state.contactno  || !this.state.email  || !this.state.password){
      //   formValid = false
      // }
      for (var key in fieldValidationErrors) {
        if (fieldValidationErrors[key] !== null){
          formValid = false;
          console.log('not valid error', key)
        }
      }

      this.setState({formValid: formValid});

      return formValid
    }

    render(){
      if (this.state.isLoggedIn) return <Redirect to="/user" />;
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
                <Row className="justify-content-md-center">
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          id="firstname"
                          defaultValue=""
                          placeholder="Firstname"
                          type="text"
                          onChange = {this.handleChange}
                        ></Form.Control>
                        <Form.Text className="text-danger">
                          {(this.state.formValid == false) ? this.state.formErrors.firstname : null}
                        </Form.Text>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center">
                  <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          id="lastname"
                          defaultValue=""
                          placeholder="Lastname"
                          type="text"
                          onChange = {this.handleChange}
                        ></Form.Control>
                        <Form.Text className="text-danger">
                          {(this.state.formValid == false) ? this.state.formErrors.lastname : null}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center">
                  <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Contact Number</label>
                        <Form.Control
                          id="contactno"
                          defaultValue=""
                          placeholder="+94xxxxxxxxx"
                          type="text"
                          onChange = {this.handleChange}
                        ></Form.Control>
                        <Form.Text className="text-danger">
                          {(this.state.formValid == false) ? this.state.formErrors.contactno : null}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center">
                    <Col className="pr-l" md="6">
                    <Form.Group>
                      <Form.Label>District</Form.Label>
                      <Form.Control 
                        id="district"
                        as="select" 
                        defaultValue="select vaccine"
                        onChange = {this.handleChange}>
                        <option>Select your district to get nearby announcements</option>
                        <option>Ampara</option>
                        <option>Anuradhapura</option>
                        <option>Badulla</option>
                        <option>Batticaloa</option>
                        <option>Colombo</option>
                        <option>Galle</option>
                        <option>Gampaha</option>
                        <option>Hambantota</option>
                        <option>Jaffna</option>
                        <option>Kalutara</option>
                        <option>Kandy</option>
                        <option>Kegalle</option>
                        <option>Kilinochchi</option>
                        <option>Kurunegala</option>
                        <option>Mannar</option>
                        <option>Matale</option>
                        <option>Matara</option>
                        <option>Monaragala</option>
                        <option>Mullaitivu</option>
                        <option>Nuwara Eliya</option>
                        <option>Polonnaruwa</option>
                        <option>Puttalam</option>
                        <option>Ratnapura</option>
                        <option>Trincomalee</option>
                        <option>Vavuniya</option>
                      </Form.Control>
                      <Form.Text className="text-danger">
                          {(this.state.formValid == false) ? this.state.formErrors.district : null}
                        </Form.Text>
                    </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center">
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
                        <Form.Text className="text-danger">
                          {(this.state.formValid == false) ? this.state.formErrors.email : null}
                        </Form.Text>
                      </Form.Group>
                      {/* <p> </p> */}
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center">
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
                        <Form.Text className="text-danger">
                          {(this.state.formValid == false) ? this.state.formErrors.password : null}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center">
                  <Col className="pr-1" md="6">
                    {this.state.error ? (
                      <Alert variant='danger'>
                        SIGNUP ERROR: {this.state.error}
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
                    SIGN UP
                  </Button>
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

export default SignUp;