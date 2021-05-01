import React, { useContext, useState } from "react";
import { useLocation} from "react-router-dom"
import { useHistory } from "react-router";
import Firebase, {db, provider} from '../firebase';
import { UserContext } from "../providers/UserProvider";

// react-bootstrap components
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

function User() {

  const history = useHistory();
  let location = useLocation();
  console.log("props from user profile", location.aboutprops);

  const user = useContext(UserContext);
  console.log("context", user)

  const [userData, setUserData] = useState(null);
  const [defaultUserData, setDefaultUserData] = useState(null);
  const [formErrors, setFormErrors] = useState({
    firstname: null,
    lastname: null,
    contactno: null,
    district:null,
  })
  const [formValid, setFormValid] = useState(null)
  
  React.useEffect(async () => {
    // let userType = location.aboutprops.userType
    // let uid = location.aboutprops.uid
    console.log("use effect")
    if(user.uid){
        const ref = db.collection(user.userType+'s').doc(user.uid);
        const doc = await ref.get();
        var UserData = doc.data();
        setDefaultUserData(UserData)
        setUserData(UserData)
        console.log(userData)
    }
    else{
        console.log("no uid")
    }
    

  }, [location]);

  console.log('user data/ default user data', userData, defaultUserData)

  const updateProfile = async (e) => {
    e.preventDefault();
    let valid = validateForm()
    console.log('errors', formErrors)
    console.log('validate', valid)

    if(valid){
      console.log('valid form')
      await db.collection(user.userType+'s').doc(user.uid).set(userData);
      history.push('/'+user.userType+'/user')
    }
    else{
      console.log('invalid form')
    }
  }

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = formErrors;
    let vauleValid = false;
  
    switch(fieldName) {
      case 'contactno':
        vauleValid = value.match(/^[+]94[0-9]{9}$/i);
        fieldValidationErrors.contactno = vauleValid ? null : ' invalid contact number (expected format : +94XXXXXXXXX)';
        break;
      default:
        vauleValid = value.length >= 1;
        fieldValidationErrors[fieldName] = vauleValid ? null : ' required field';
        break;
    }
    setFormErrors(fieldValidationErrors)
  }
  
  const validateForm = () => {
    let fieldValidationErrors = formErrors;
    let formValid = true;
   
    for (var key in fieldValidationErrors) {
      if (fieldValidationErrors[key] !== null){
        formValid = false;
        console.log('not valid error', key)
      }
    }

    setFormValid(formValid)

    return formValid
  }

  const resetData = async (e) => {
    e.preventDefault()
    // const ref = db.collection(user.userType+'s').doc(user.uid);
    // const doc = await ref.get();
    // let defaultUserData = doc.data();
    // setUserData(defaultUserData)
    // console.log(userData)
    history.push('/'+user.userType+'/user')
  }

  if(userData && defaultUserData) return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          id="firstname"
                          defaultValue={defaultUserData.firstname}
                          placeholder="firstname"
                          type="text"
                          onChange = {(e) => {setUserData({ ...userData, firstname: e.target.value }); validateField(e.target.id, e.target.value)}}
                        ></Form.Control>
                        <Form.Text className="text-danger">
                          {(formValid == false) ? formErrors.firstname : null}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          id="lastname"
                          defaultValue={userData.lastname}
                          placeholder="lastname"
                          type="text"
                          onChange = {e => {setUserData({ ...userData, lastname: e.target.value }); validateField(e.target.id, e.target.value)}}
                        ></Form.Control>
                        <Form.Text className="text-danger">
                          {(formValid == false) ? formErrors.lastname : null}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Contact Number</label>
                        <Form.Control
                          id="contactno"
                          defaultValue={userData.contactno}
                          placeholder="+94xxxxxxxxx"
                          type="text"
                          onChange = {e => {setUserData({ ...userData, contactno: e.target.value }); validateField(e.target.id, e.target.value)}}
                        ></Form.Control>
                        <Form.Text className="text-danger">
                          {(formValid == false) ? formErrors.contactno : null}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                    <Form.Group>
                      <Form.Label>District</Form.Label>
                      <Form.Control 
                        id="district"
                        as="select" 
                        defaultValue={userData.district}
                        onChange = {e => {setUserData({ ...userData, district: e.target.value }); validateField(e.target.id, e.target.value)}}>
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
                          {(formValid == false) ? formErrors.district : null}
                      </Form.Text>
                    </Form.Group>
                    </Col>
                  </Row>
                  <hr></hr>
                  <h4>Vaccination Details</h4>
                  <Row>
                    <Col className="pr-l" md="12">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Vaccine</Form.Label>
                      <Form.Control 
                        as="select" 
                        defaultValue={userData.vaccine ? userData.vaccine : 'Select Vaccine'}
                        onChange = {(e) => (e.target.value!= 'Select Vaccine') ? setUserData({ ...userData, vaccine: e.target.value }) : setUserData(userData)}>
                        { userData.vaccine ? (null) : (<option>'Select Vaccine'</option>)}
                        <option>Oxford-AstraZeneca-Covishield</option>
                        {/* <option>None</option> */}
                        {/* <option>4</option>
                        <option>5</option> */}
                      </Form.Control>
                    </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Dose 1</label>
                        <Form.Control
                          defaultValue={userData.vaccineDose1 ? userData.vaccineDose1 : ""}
                          placeholder="dose 1 date"
                          type="date"
                          disabled={userData.vaccine? false: true}
                          onChange = {e => setUserData({ ...userData, vaccineDose1: e.target.value })}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Dose 2</label>
                        <Form.Control
                          defaultValue={userData.vaccineDose2 ? userData.vaccineDose2 : ""}
                          placeholder="dose 2 date"
                          type="date"
                          disabled={(userData.vaccine && userData.vaccineDose1) ? false: true}
                          onChange = {e => setUserData({ ...userData, vaccineDose2: e.target.value })}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <hr/>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Notes</label>
                        <Form.Control
                          cols="80"
                          defaultValue={userData.notes? userData.notes : ""}
                          placeholder="Add notes"
                          rows="4"
                          as="textarea"
                          onChange = {e => setUserData({ ...userData, notes: e.target.value })}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                  <Col md="3">
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={updateProfile}
                  >
                    Update Profile
                  </Button>
                  </Col>
                  {/* <Col md="3">
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={resetData}
                  >
                    Reset
                  </Button>
                  </Col> */}
                  </Row>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
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
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-0.jpg").default}
                    ></img>
                    <h5 className="title">{defaultUserData.firstname + ' ' + defaultUserData.lastname}</h5>
                  </a>
                  <p className="description">Email : {defaultUserData.email}</p>
                  <p className="description">Contact Number : {defaultUserData.contactno}</p>
                  <p className="description">District : {defaultUserData.district}</p>
                </div>
                <hr></hr>
                {defaultUserData.vaccine ? (
                  <div className="text-align-center">
                    <h6 className="title text-center">Vaccination Details</h6>
                    <p className="description text-center">Vaccine : {defaultUserData.vaccine}</p>
                    <p className="description text-center">Dose 1 Date : {defaultUserData.vaccineDose1}</p>
                    <p className="description text-center">Dose 2 Date : {defaultUserData.vaccineDose2 ? defaultUserData.vaccineDose2 : 'Dose 2 not taken'}</p>
                  </div>
                  ): (<div></div>)}
                <p className="description text-center">NOTES: {defaultUserData.notes ? defaultUserData.notes : ''}</p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
  return (<div></div>)
}

export default User;
