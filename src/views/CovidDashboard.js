import React, {Component} from "react";
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
    Form,
    OverlayTrigger,
    Tooltip,
    DropdownButton,
    Dropdown
  } from "react-bootstrap";
import axios from 'axios';

class CovidDashboard extends Component{
    state = {
        covishield_first:0,
        covishield_second:0,
        sinopharm_first:0,
        sinopharm_second:0,  
        local_total_cases:0,
        global_total_cases:0,
        local_new_cases:0,
        local_deaths:0,
        local_recovered:0,
        local_active_cases:0,
        local_total_number_of_individuals_in_hospitals:0,
        local_new_deaths:0,
        global_new_cases:0,
        global_deaths:0,
        global_recovered:0,
        global_new_deaths:0,
        total_pcr_testing_count:0
      }
  
      constructor(props) {
        super(props);
      }
  
    async componentDidMount(){
        await this.vaccineFetch();
        this.localGlobalFetch();

    };

    thousands_separators = (num) => {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    };

    vaccineFetch=async()=>{
        await axios.get(`https://bsafe-ampersand.herokuapp.com/covid19/srilanka/vaccines`).then(res => {
            this.setState({
                covishield_first : this.thousands_separators(res.data.Covishield_Vaccine_First_Dose),
                covishield_second : this.thousands_separators(res.data.Sinopharm_Vaccine_First_Dose),
                sinopharm_first : this.thousands_separators(res.data.Covishield_Vaccine_Second_Dose),
                sinopharm_second : this.thousands_separators(res.data.Sinopharm_Vaccine_Second_Dose)
              });            
        });
    }

    localGlobalFetch(){
        axios.get(`https://hpb.health.gov.lk/api/get-current-statistical`).then(res => {
            this.setState({
                local_total_cases: this.thousands_separators(res.data.data.local_total_cases),
                global_total_cases: this.thousands_separators(res.data.data.global_total_cases),
                local_deaths : this.thousands_separators(res.data.data.local_deaths),
                local_new_cases : this.thousands_separators(res.data.data.local_new_cases),
                local_recovered :this.thousands_separators(res.data.data.local_recovered),
                local_active_cases : this.thousands_separators(res.data.data.local_active_cases),
                local_new_deaths : this.thousands_separators(res.data.data.local_new_deaths),
                local_total_number_of_individuals_in_hospitals : this.thousands_separators(res.data.data.local_total_number_of_individuals_in_hospitals),
                global_deaths : this.thousands_separators(res.data.data.global_deaths),
                global_new_cases : this.thousands_separators(res.data.data.global_new_cases),
                global_recovered : this.thousands_separators(res.data.data.global_recovered),
                global_new_deaths : this.thousands_separators(res.data.data.global_new_deaths),
                total_pcr_testing_count: this.thousands_separators(res.data.data.total_pcr_testing_count),
              });            
        });
    }

    render(){
        return(
        <>
        <Container fluid>
            <Row>
            <h2>Local Statistics</h2>
            </Row>
            <Row>
            
            <Col md="4">
                <Card className="text-center">
                <Card.Header>
                    <Card.Title as="h4">Total Cases</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src="https://news.cgtn.com/news/2020-06-25/Studies-Wearing-masks-saves-lives-amid-COVID-19-RCcdxQoxVe/img/8704bedefaba4ee08e9d83df32fbda90/8704bedefaba4ee08e9d83df32fbda90.jpeg" />
                <Card.Body>
                    <Card.Text >
                    <b>{this.state.local_total_cases}</b>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
                </Card>
            </Col>
            <Col md="4">
                <Card className="text-center">
                <Card.Header>
                    <Card.Title as="h4">New Cases</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src="https://kairoscommunity.org.uk/wp-content/uploads/2020/10/w-cr-Kairos-Covid-19-temperature-check-copy.jpg" />
                <Card.Body>
                <Card.Text  >
                    <b>{this.state.local_new_cases}</b>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
                </Card>
            </Col>
    
            <Col md="4">
                <Card className="text-center">
                <Card.Header>
                    <Card.Title as="h4">Recovered</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src="https://i.pinimg.com/736x/34/81/fc/3481fcd65a0e64146657ef18abb241aa.jpg" />
                <Card.Body>
                <Card.Text>
                <b>{this.state.local_recovered}</b>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
                </Card>
            </Col>
            
            </Row>
            <Row>
            
            <Col md="4">
                <Card className="text-center">
                <Card.Header>
                    <Card.Title as="h4">Deaths</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src="https://cdn.mos.cms.futurecdn.net/dvNfjRyADTRpsvbSXmyDAj-970-80.jpg.webp" />
                <Card.Body>
                    <Card.Text className="stat-text">
                    <b>{this.state.local_deaths}</b>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
                </Card>
            </Col>
            <Col md="4">
                <Card className="text-center">
                <Card.Header>
                    <Card.Title as="h4">New Deaths</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src="https://images.indianexpress.com/2020/06/dead-body-2.jpg" />   
                <Card.Body>
                    <Card.Text className="stat-text">
                    <b>{this.state.local_new_deaths}</b>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
                </Card>
            </Col>
    
            <Col md="4">
                <Card className="text-center">
                <Card.Header>
                    <Card.Title as="h4">Total PCR testing</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src="https://news.ucdenver.edu/wp-content/uploads/2020/12/3906696-1288x726.jpg" />   
                <Card.Body>
                    <Card.Text className="stat-text">
                    <b>{this.state.total_pcr_testing_count}</b>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
                </Card>
            </Col>
            
            </Row>
            
    
    
            <Row>
            
            <Col md="3">
            <Card className="text-center">
                <Card.Header>
                <Card.Title as="h4">Covishield First Dose</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src="https://i.ibb.co/1dXxj4G/vaccine-1.jpg" />
                <Card.Body>
                <Card.Text className="stat-text" >
                <b>{this.state.covishield_first}</b>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
            </Card>
            </Col>
            <Col md="3">
            <Card className="text-center">
                <Card.Header>
                <Card.Title as="h4">Covishield Second Dose</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src="https://i.ibb.co/VtBG6gb/vaccine-2.jpg" />   
                <Card.Body>
                <Card.Text className="stat-text">
                <b>{this.state.covishield_second}</b>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
            </Card>
            </Col>
    
            <Col md="3">
            <Card className="text-center">
                <Card.Header>
                <Card.Title as="h4">Sinopharm First Dose</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src="https://i.ibb.co/4R20kF3/vaccine-3.jpg" />   
                <Card.Body>
                <Card.Text className="stat-text">
                <b>{this.state.sinopharm_first}</b>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
            </Card>
            </Col>
    
            <Col md="3">
            <Card className="text-center">
                <Card.Header>
                <Card.Title as="h4">Sinopharm Second Dose</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src="https://i.ibb.co/KDyRLWQ/vaccine-4.jpg" />   
                <Card.Body>
                <Card.Text className="stat-text">
                <b>{this.state.sinopharm_second}</b>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
            </Card>
            </Col>
            
        </Row>
    
    
            <Row>
            <h2>Global Statistics</h2>
            </Row>
            <Row>
            
            <Col md="4">
            <Card className="text-center">
                <Card.Header>
                <Card.Title as="h4">Total Cases</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src="https://news.cgtn.com/news/2020-06-25/Studies-Wearing-masks-saves-lives-amid-COVID-19-RCcdxQoxVe/img/8704bedefaba4ee08e9d83df32fbda90/8704bedefaba4ee08e9d83df32fbda90.jpeg" />
                <Card.Body>
                    <Card.Text className="stat-text">
                    <b>{this.state.global_total_cases}</b>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
            </Card>
            </Col>
            <Col md="4">
            <Card className="text-center">
                <Card.Header>
                <Card.Title as="h4">New Cases</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src="https://kairoscommunity.org.uk/wp-content/uploads/2020/10/w-cr-Kairos-Covid-19-temperature-check-copy.jpg" />
                <Card.Body>
                    <Card.Text className="stat-text">
                    <b>{this.state.global_new_cases}</b>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
            </Card>
            </Col>
    
            <Col md="4">
            <Card className="text-center">
                <Card.Header>
                <Card.Title as="h4">Recovered</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src="https://i.pinimg.com/736x/34/81/fc/3481fcd65a0e64146657ef18abb241aa.jpg" />
                <Card.Body>
                    <Card.Text className="stat-text">
                    <b>{this.state.global_recovered}</b>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
            </Card>
            </Col>
            
        </Row>
        <Row>
        
            <Col md="4">
            <Card className="text-center">
                <Card.Header>
                <Card.Title as="h4">Deaths</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src="https://cdn.mos.cms.futurecdn.net/dvNfjRyADTRpsvbSXmyDAj-970-80.jpg.webp" />
                <Card.Body>
                    <Card.Text className="stat-text">
                    <b>{this.state.global_deaths}</b>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
            </Card>
            </Col>
            <Col md="4">
            <Card className="text-center">
                <Card.Header>
                <Card.Title as="h4">New Deaths</Card.Title>
                </Card.Header>
                <Card.Img variant="top" src="https://images.indianexpress.com/2020/06/dead-body-2.jpg" />   
                <Card.Body>
                    <Card.Text className="stat-text">
                    <b>{this.state.global_new_deaths}</b>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
            </Card>
            </Col>
    
        </Row>            
        </Container>
        </>
        )
    }
      
}

export default CovidDashboard;