import React ,{ useState , Component}  from "react";
import Firebase, {db, provider} from '../firebase';
import firebase from '../firebase';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
  Form,
} from "react-bootstrap";
import axios from "axios";


 

class Announcement extends Component{

  state = {
    startDate : new Date,
    district : 'Colombo',
    division : 'Pirivena Road',
    location : 'https://goo.gl/maps/A9a5JeczpxCCZWW67',
    description : '',
    age : 60,
    isPregnant: false,
    isBreastFeeding: false,
    isAllergic: false,
    announcementsList : [],
  }

  componentDidMount(){
    this.fetchData();
  }


  fetchData = async (e)=>{
    await db.collection("announcements").get().then((querySnapshot) => {
      let announcementList = [];
        querySnapshot.forEach((doc) => {
          //console.log(doc.id, " => ", doc.data());

          let post ={
            Id : doc.id,
            createdAt : doc.data().createdAt,
            description : doc.data().description
          }
          announcementList.push(post);

        });
        // announcementList.filter(obj => {
        //   console.log(obj.Id);
        // })

        // this.setState({announcementsList: announcementList});
        this.setState(({
          announcementsList:[...this.state.announcementsList,announcementList]
        }))
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        });
        console.log(this.state.announcementsList+"dzhjnhashini");
        // this.state.announcementsList.filter(obj => {
        //   console.log(obj.Id);
        // })
        console.log(this.state.announcementsList.length)
        // this.state.announcementsList[0].map((data,i) => {
        //   console.log(data.description);
        // })

  }
 
  announcement=async(e)=> {
    e.preventDefault();

    console.log("submit data"+this.state.description);
    try {
                 var today = new Date(),
                date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  
            const announcement = {
                description: this.state.description,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
               
            }
            await db.collection('announcements').add(announcement);
            console.log('announcement------');

            await db.collection("users").where("district", "==", this.state.district).get().then((querySnapshot) => {
            querySnapshot.forEach(async(doc) => {
            // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              const msg={
                from_number : "",
                to_number :doc.data().contactno,
                message_body: `Hi ${doc.data().firstname}\n`+this.state.description
              }
              await axios.post(`http://127.0.0.1:5000/sms`,msg).then(res=>console.log(res)).catch(err=>console.log(err));
            });
            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });

          
        
        
    } catch (error) {
        console.log('error', error);
        alert(error)
        return false
    }
    //this.messageForm.reset();
    this.setState({
      startDate : new Date,
      district : 'Colombo',
      division : 'Pirivena Road',
      location : 'https://goo.gl/maps/A9a5JeczpxCCZWW67',
      description : '',
      age : 60,
      isPregnant: false,
      isBreastFeeding: false,
      isAllergic: false,
    })
  }

  handleDateChange = e => {
    var variable = 'Covid vaccination is now available in ' + this.state.district + ' district, ' + this.state.division + ' divisional secretary at location : ' +  this.state.location + ' from ' + e ;  
    
 
    this.setState({
      startDate: e,
      description:variable
     
    });
    console.log(this.state)
  }
  handleDistrictChange = e => {
    var variable = 'Covid vaccination is now available in ' + e + ' district, '  ;  

   
    this.setState({
      district: e,
      description: variable
    });
    console.log(e)
  }

  handleDivisionChange = e => {

    var variable = 'Covid vaccination is now available in ' + this.state.district + ' district, ' + e.target.value + ' divisional secretary at location : ';
    this.setState({
      division: e.target.value,
      description:variable
    });
    console.log(e.target.value)
  }

  handleLocationChange = e => {

    var variable = 'Covid vaccination is now available in ' + this.state.district + ' district, ' + this.state.division + ' divisional secretary at location : ' +  e.target.value;  
   
    this.setState({
      location: e.target.value,
      description:variable
    });
    console.log(e.target.value)
  }

  handleAgeChange = e => {

    var variable = 'Covid vaccination is now available in ' + this.state.district + ' district, ' + this.state.division + ' divisional secretary at location : ' +  this.state.location + ' .Vaccination criteria :: (1) Age should be above  ' + e.target.value;  
   
    this.setState({
      age: e.target.value,
      description:variable
    });
    console.log(e.target.value)
  }

  handlePregnancyChange = e => {


    this.setState({
      isPregnant: !this.state.isPregnant,
    });
    console.log("zgjfngjknsjkfdngjk"+ this.state.isPregnant)
  }

  handleBreastFeedingChange = e => {

   
    this.setState({
      isBreastFeeding: !this.state.isBreastFeeding,
    });
    console.log("zgjfngjknsjkfdngjk"+ this.state.isPregnant)
  }

  handleAllergicChange = e => {

   
        if(this.state.isAllergic==true){
          var variable = 'Covid vaccination is now available in ' + this.state.district + ' district, ' + this.state.division + ' divisional secretary at location : ' +  this.state.location + ' .Vaccination criteria :: (1) Age should be above  ' + this.state.age + ' (2) Should not be pregnent , (3) should not be a breast feeding mother , (4) should not have any allergic reactions or history of allergic conditions';  
        }
        else{
          var variable = 'Covid vaccination is now available in ' + this.state.district + ' district, ' + this.state.division + ' divisional secretary at location : ' +  this.state.location + ' .Vaccination criteria :: Should be within the age range of 18 and  ' + this.state.age +  ' (2) Should not be pregnent , (3) should not be a breast feeding mother , (4) People with allergic reactions or history of allergic conditions will receive advices within the vaccination premises';  
  
        }
        
    this.setState({
      isAllergic: !this.state.isAllergic,
      description:variable
    });
    console.log("zgjfngjknsjkfdngjk"+ this.state.isAllergic)
  }

  render(){
  return(
      <Container fluid>
        <Row>
          <Col md="12">
          <div><h3>Post an announcement</h3></div>
          <Form  className="form"  ref={ form => this.messageForm = form }>
            <Form.Row>
             <Form.Group  as={Col} md="4"  controlId="form.District">
                <Form.Label>District</Form.Label>
                <InputGroup>
                <FormControl placeholder={this.state.district} aria-label="District" aria-describedby="basic-addon2"/>
                <DropdownButton as={InputGroup.Append} variant="outline-secondary" title="District" id="input-group-dropdown-2"  onSelect={this.handleDistrictChange}>
                  <Dropdown.Item eventKey='Colombo' >Colombo</Dropdown.Item>
                  <Dropdown.Item eventKey='Gampaha' >Gampaha</Dropdown.Item>
                  <Dropdown.Item eventKey='Kalutara'>Kalutara</Dropdown.Item>
                  <Dropdown.Item eventKey='Polonnaruwa'>Polonnaruwa</Dropdown.Item>
                  <Dropdown.Item eventKey='Ampara'>Ampara</Dropdown.Item>
                  <Dropdown.Item eventKey='Anuradhapura'>Anuradhapura</Dropdown.Item>
                  <Dropdown.Item eventKey='Badulla'>Badulla</Dropdown.Item>
                  <Dropdown.Item eventKey='Batticaloa'>Batticaloa</Dropdown.Item>
                  <Dropdown.Item eventKey='Galle'>Galle</Dropdown.Item>
                  <Dropdown.Item eventKey='Hambantota'>Hambantota</Dropdown.Item>
                  <Dropdown.Item eventKey='Jaffna'>Jaffna</Dropdown.Item>
                  <Dropdown.Item eventKey='Kandy'>Kandy</Dropdown.Item>
                  <Dropdown.Item eventKey='Kegalle'>Kegalle</Dropdown.Item>
                  <Dropdown.Item eventKey='Kilinochchi'>Kilinochchi</Dropdown.Item>
                  <Dropdown.Item eventKey='Kurunegala'>Kurunegala</Dropdown.Item>
                  <Dropdown.Item eventKey='Mannar'>Mannar</Dropdown.Item>
                  <Dropdown.Item eventKey='Matale'>Matale</Dropdown.Item>
                  <Dropdown.Item eventKey='Matara'>Matara</Dropdown.Item>
                  <Dropdown.Item eventKey='Monaragala'>Monaragala</Dropdown.Item>
                  <Dropdown.Item eventKey='Mullaitivu'>Mullaitivu</Dropdown.Item>
                  <Dropdown.Item eventKey='Nuwara Eliya'>Nuwara Eliya</Dropdown.Item>
                  <Dropdown.Item eventKey='Puttalam'>Puttalam</Dropdown.Item>
                  <Dropdown.Item eventKey='Ratnapura'>Ratnapura</Dropdown.Item>
                  <Dropdown.Item eventKey='Trincomalee'>Trincomalee</Dropdown.Item>
                  <Dropdown.Item eventKey='Vavuniya'>Vavuniya</Dropdown.Item>
                </DropdownButton>
                </InputGroup>
            </Form.Group>

            <Form.Group  as={Col} md="4"  controlId="form.Divisional_secretary">
                <Form.Label>Divisional Secretary</Form.Label>
                <FormControl  type="text" rows={1} aria-label="District" aria-describedby="basic-addon2" defaultValue={this.state.division}  onChange = {this.handleDivisionChange}/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
          <Form.Group  as={Col} md="8"  controlId="form.Address">
                <Form.Label>Location Address</Form.Label>
                <FormControl  type="text" aria-label="Address" aria-describedby="basic-addon2" defaultValue={this.state.location} onChange = {this.handleLocationChange}/>
          </Form.Group>
          </Form.Row>

          <Form.Row>
          <Form.Group  as={Col} md="8"  controlId="form.Date">
          <Form.Label>Date    : </Form.Label>
            <DatePicker selected={this.state.startDate}  onChange = {this.handleDateChange} />
          </Form.Group>
         
          </Form.Row>
       
          <Form.Row>
          <Form.Group  as={Col} md="8"  controlId="form.age">
                <Form.Label>Vaccination criteria</Form.Label>

          </Form.Group>
          </Form.Row>

          <Form.Row>
          <Form.Group  as={Col} md="8"  controlId="form.Description">
                <Form.Label> Minimum Age</Form.Label>
                <FormControl  type="number" aria-label="Address" aria-describedby="basic-addon2" defaultValue={this.state.age} onChange = {this.handleAgeChange}/>

          </Form.Group>
          </Form.Row>
      
         
         <Form.Row>
         <Form.Group controlId="form.pregnancy">
         <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Checkbox aria-label="Checkbox for following text input"  defaultChecked={this.state.isPregnant}  onChange={this.handlePregnancyChange}/>
            </InputGroup.Prepend>
            <FormControl aria-label="Text input with checkbox" defaultValue = "Pregnancy" />
          </InputGroup>
        </Form.Group>
        </Form.Row>
         
        <Form.Row>
         <Form.Group controlId="form.breast-feading">
         <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Checkbox aria-label="Checkbox for following text input" defaultChecked={this.state.isBreastFeeding}  onChange={this.handleBreastFeedingChange}/>
            </InputGroup.Prepend>
            <FormControl aria-label="Text input with checkbox" defaultValue = "Breast Feeding mothers"  />
          </InputGroup>
        </Form.Group>
        </Form.Row>
         
        <Form.Row>
         <Form.Group controlId="form.allergy">
         <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Checkbox aria-label="Checkbox for following text input" defaultChecked={this.state.isAllergic}  onChange={this.handleAllergicChange} />
            </InputGroup.Prepend>
            <FormControl aria-label="Text input with checkbox" defaultValue = "People with alergic reactions" />
          </InputGroup>
        </Form.Group>
        </Form.Row>
         


          <Form.Row>
          <Form.Group  as={Col} md="8"  controlId="form.Description">
                <Form.Label>Announcement Description</Form.Label>
                <Form.Text>{this.state.description}</Form.Text>

          </Form.Group>
          </Form.Row>
        
            <Button variant="primary" type="submit"  onClick={this.announcement}>Submit</Button>
          </Form>
          </Col>
        </Row>
        
        <Row>
          <Col md="12">
            <br/>
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Published Announcements</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Created At</th>
                      <th className="border-0">Description</th>
                    </tr>
                  </thead>

                  <tbody>
            {this.state.announcementsList[0] && this.state.announcementsList[0].map((data,i) => {
                return (
                            
                  <tr key={i}>     
                     {/* <td>{data.Id}</td> */}
                      <td>{Date(data.createdAt)}</td>
                      <td>{data.description}</td>     
                  </tr>  
            
                );
               
                })}
        
               
            </tbody>  
                </Table>
              </Card.Body>
            </Card>
          </Col>
        
        </Row>
      </Container>
    
  )
}
}

export default Announcement;


