import React, {Component} from "react";
import ReactFusioncharts from "react-fusioncharts";
import SriLanka from 'fusionmaps/maps/fusioncharts.srilanka';
import FusionMaps from "fusioncharts/fusioncharts.maps";
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import FusionCharts from "fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import axios from 'axios';
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
  Dropdown,
  Image
} from "react-bootstrap";

ReactFusioncharts.fcRoot(FusionCharts, FusionMaps,SriLanka,FusionTheme);
ReactFusioncharts.fcRoot(FusionCharts, Widgets, FusionTheme);

const images = [
  "https://i.ibb.co/TYxtBDq/Ampara.png",   //1
  "https://i.ibb.co/710pHqf/Anuradhapura.png",//2
  "https://i.ibb.co/tKKxDTT/Badulla.png",//3
  "https://i.ibb.co/vsQcpyq/Batticaloa.png", //4
  "https://i.ibb.co/J5dDVQs/Colombo.png", //5
  "https://i.ibb.co/PCk6bRf/Galle.png", //6
  "https://i.ibb.co/q7H2s28/Gampaha.png", //7 
  "https://i.ibb.co/fN4kjWN/Hambantota.png",  //8
  "https://i.ibb.co/vXKWzBX/Jaffna.png", // 9
  "https://i.ibb.co/W282FgL/Kalutara.png", //10
  "https://i.ibb.co/gD7GQFV/Kandy.png",  //11
  "https://i.ibb.co/9sG1dkL/Kegalle.png", //12
  "https://i.ibb.co/XxJHPjf/Kilinochchi.png", //13
  "https://i.ibb.co/tcTQsBb/Kurunegala.png",  //14
  "https://i.ibb.co/t3T2LQd/Mannar.png",  //15
  "https://i.ibb.co/7SZ6bcH/Matara.png",  //16
  "https://i.ibb.co/w0HyY9j/Moneragala.png", //17
  "https://i.ibb.co/12sdz2C/Mullaitive.png", //18
  "https://i.ibb.co/84XLfj4/Nuwara-Eliya.png",  //19
  "https://i.ibb.co/bWJMcV3/Polonnaruwa.png", //20
  "https://i.ibb.co/k2SQdfW/Puttalam.png",  //21
  "https://i.ibb.co/cc2ksyh/Rathnapura.png", //22
  "https://i.ibb.co/3sYjQfL/Trincomalee.png", //23
  "https://i.ibb.co/1ZhWfK2/Vavuniya.png",  //24
  "https://i.ibb.co/CmgrH1n/Matale.png",  //25
  
];
var c_local = 0;
var c_foreign =0;
var t_local = 0;
var t_foreign =0;
var total_local = 0;
var total_foreign = 0;
var HospitalArray = [];

class Maps extends Component{

  state = {
    districts:{},
    maxCovid:0,
    selectedDistrict:0,
    cumulative_local:0,
    cumulative_foreign:0,
    total1 :0,
    total2 :0,
    total3 :0,
    total4 :0,
    total5 :0,
    total6 :0,
    Harray : [],
  }

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.districtFetch();
  };

  districtFetch=async()=>{
    await axios.get(`https://bsafe-ampersand.herokuapp.com/covid19/srilanka/districts`).then(res => {
        this.setState({
            districts:res.data
          });                 
    });
    var count=0;
    for (const key in this.state.districts) {
      if(count<=parseInt(this.state.districts[key])){
        count=parseInt(this.state.districts[key])
      }
  }
  this.setState({
    maxCovid:count
  });  
  console.log(this.state.maxCovid)  
}

thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

handleSelect=(e)=>{
  console.log(e);
  this.setState({selectedDistrict:parseInt(e)})
  c_local=0;
  c_foreign=0;
  t_local=0;
  t_foreign=0;
  total_local=0;
  total_foreign=0;
  HospitalArray = null;
  this.districtHospital(e);
}

async newsFetch(id){
  axios(
    `https://hpb.health.gov.lk/api/get-current-statistical`
  ).then(res => {

      //console.log("local newww" +  data.data.hospital_data[id-1].hospital.name);
      //console.log("vvvv"+HospitalArray);
      c_local = c_local+ res.data.data.hospital_data[id-1].cumulative_local;
      c_foreign = c_foreign + res.data.data.hospital_data[id-1].cumulative_foreign;
      t_local = t_local + res.data.data.hospital_data[id-1].treatment_local;
      total_local = total_local + res.data.data.hospital_data[id-1].cumulative_total;
      total_foreign = total_foreign + res.data.data.hospital_data[id-1].treatment_total;
      HospitalArray= res.data.data.hospital_data[id-1].hospital.name;


      this.state.Harray.push({HospitalArray})
      this.setState({
          total1 : this.thousands_separators(c_local),
          total2 : this.thousands_separators(c_foreign),
          total3 : this.thousands_separators(t_local),
          total4 : this.thousands_separators(t_foreign),
          total5 : this.thousands_separators(total_local),
          total6 : this.thousands_separators(total_foreign),
          // Harray : HospitalArray,
        });
      
  });
 }

 districtHospital(item) {    

  this.setState({
    total1 :0,
    total2 :0,
    total3 :0,
    total4 :0,
    total5 :0,
    total6 :0,
    Harray:[]
  
  });
  //console.log(item);
   if(item == 4){
          this.newsFetch(1);
          this.newsFetch(2);
          this.newsFetch(3);
          this.newsFetch(14);
          this.newsFetch(15);
          this.newsFetch(18);
          this.newsFetch(24);
          this.newsFetch(32);
          this.newsFetch(25);
          this.newsFetch(26);
          this.newsFetch(29);
   }else if(item == 0){
    //  this.newsFetch();
   }else if(item == 1){
          this.newsFetch(5);
   }else if(item == 2){
          this.newsFetch(13);
   }else if(item == 3){
          this.newsFetch(9);
          this.newsFetch(34);
   }
   else if(item == 5){
         this.newsFetch(4);
   }
   else if(item == 6){
          this.newsFetch(10);
          this.newsFetch(11);
          this.newsFetch(23);
          this.newsFetch(35);
          this.newsFetch(36);
   }
   else if(item == 7){
         this.newsFetch(19);
   }
   else if(item == 8){
        this.newsFetch(7);
   }
   else if(item == 9){
         this.newsFetch(22);
         this.newsFetch(33);
   }
   else if(item == 10){
         this.newsFetch(8);
   }
   else if(item == 11){
        //  this.newsFetch(9);
   }
   else if(item == 12){
        // this.newsFetch(9);
   }
   else if(item == 13){
         this.newsFetch(6);
   }
   else if(item == 14){
        // this.newsFetch();
   }
   else if(item == 15){
         this.newsFetch(28);
   }
   else if(item == 16){
        this.newsFetch(20);
   }
   else if(item == 17){
        // this.newsFetch(9);
   }
   else if(item == 18){
       // this.newsFetch(9);
   }
   else if(item == 19){
        this.newsFetch(16);
        this.newsFetch(21);
   }
   else if(item == 20){
        this.newsFetch(27);
        this.newsFetch(31);
   }
   else if(item == 21){
         this.newsFetch(12);
   }
   else if(item == 22){
        // this.newsFetch(9);
   }
   else if(item == 23){
        this.newsFetch(30);
   }
   else if(item == 24){
        // this.newsFetch(9);
   }
}

  render(){
    return(
      <>
        <Container fluid>
            <Row>
            <h2>District Statistics</h2>
            </Row>
            <Row>
            
            <Col md="6">
                <Card className="text-center" style={{height:"550px"}}>
                <Card.Header>
                    <Card.Title as="h5"> Individuals who contracted the disease from the districts</Card.Title>
                </Card.Header>
                <Card.Body>
                <ReactFusioncharts
                type="maps/srilanka"
                width="100%"
                height="500"
                dataFormat="JSON"
                dataSource={ {
                  chart: {
                    legendposition: "BOTTOM",
                    entitytooltext: "$lname: <b>$datavalue </b>count",
                    entityfillhovercolor: "#f1f8e9",
                    theme: "fusion"
                  },
                  colorrange: {
                    gradient: "0",
                    color: [
                      {
                        maxvalue: this.state.maxCovid/4,
                        displayvalue:`0-${this.state.maxCovid/4}`,
                        code: "#9DB2BB"
                      },
                      {
                        maxvalue: this.state.maxCovid/2,
                        displayvalue: `${this.state.maxCovid/4}-${this.state.maxCovid/2}`,
                        code: "#6C8C99"
                      },
                      {
                        maxvalue: this.state.maxCovid/4*3,
                        displayvalue: `${this.state.maxCovid/2}-${this.state.maxCovid/4*3}`,
                        code: "#3B6677"
                      },
                      {
                        maxvalue: this.state.maxCovid,
                        displayvalue: `${this.state.maxCovid/4*3}-${this.state.maxCovid}`,
                        code: "#0a4056"
                      },
                      {
                        maxvalue: "0",
                        displayvalue: "N/A",
                        code: "#e0e0e0"
                      }
                    ]
                  },
                  data: [
                    {
                      data: [
                        {
                          id: "LK.KY",
                          value: this.state.districts['KANDY']?this.state.districts['KANDY']:0
                        },
                        {
                          id: "LK.MJ",
                          value: this.state.districts['MONERAGALA']?this.state.districts['MONERAGALA']:0
                        },
                        {
                          id: "LK.BD",
                          value: this.state.districts['BADULLA']?this.state.districts['BADULLA']:0
                        },
                        {
                          id: "LK.HB",
                          value: this.state.districts['HAMBANTOTA']?this.state.districts['HAMBANTOTA']:0
                        },
                        {
                          id: "LK.MH",
                          value: this.state.districts['MATARA']?this.state.districts['MATARA']:0
                        },
                        {
                          id: "LK.GL",
                          value: this.state.districts['GALLE']?this.state.districts['GALLE']:0
                        },
                        {
                          id: "LK.KT",
                          value: this.state.districts['KALUTARA']?this.state.districts['KALUTARA']:0
                        },
                        {
                          id: "LK.PX",
                          value: this.state.districts['PUTTALAM']?this.state.districts['PUTTALAM']:0
                        },
                        {
                          id: "LK.AD",
                          value: this.state.districts['ANURADHAPURA']?this.state.districts['ANURADHAPURA']:0
                        },
                        {
                          id: "LK.PR",
                          value: this.state.districts['POLONNARUWA']?this.state.districts['POLONNARUWA']:0
                        },
                        {
                          id: "LK.KG",
                          value: this.state.districts['KURUNEGALA']?this.state.districts['KURUNEGALA']:0
                        },
                        {
                          id: "LK.MT",
                          value: this.state.districts['MATALE']?this.state.districts['MATALE']:0
                        },
                        {
                          id: "LK.KE",
                          value: this.state.districts['KEGALLE']?this.state.districts['KEGALLE']:0
                        },
                        {
                          id: "LK.RN",
                          value: this.state.districts['RATNAPURA']?this.state.districts['RATNAPURA']:0
                        },
                        {
                          id: "LK.GQ",
                          value: this.state.districts['GAMPAHA']?this.state.districts['GAMPAHA']:0
                        },
                        {
                          id: "LK.CO",
                          value: this.state.districts['COLOMBO']? this.state.districts['COLOMBO']:0
                        },
                        {
                          id: "LK.JA",
                          value: this.state.districts['JAFFNA']? this.state.districts['JAFFNA']:0

                        },
                        {
                          id: "LK.KL",
                          value: this.state.districts['KILINOCHCHI']? this.state.districts['KILINOCHCHI']:0

                        },
                        {
                          id: "LK.MP",
                          value: this.state.districts['MULLATIVU']? this.state.districts['MULLATIVU']:0

                        },
                        {
                          id: "LK.MB",
                          value: this.state.districts['MANNAR']? this.state.districts['MANNAR']:0

                        },
                        {
                          id: "LK.VA",
                          value: this.state.districts['VAVUNIA']? this.state.districts['VAVUNIA']:0

                        },
                        {
                          id: "LK.NW",
                          value: this.state.districts['NUWARAELIYA']? this.state.districts['NUWARAELIYA']:0

                        },
                        {
                          id: "LK.TC",
                          value: this.state.districts['TRINCOMALEE']? this.state.districts['TRINCOMALEE']:0

                        },
                        {
                          id: "LK.BC",
                          value: this.state.districts['BATTICOLOA']? this.state.districts['BATTICOLOA']:0

                        },
                        {
                          id: "LK.AP",
                          value: this.state.districts['AMPARA']? this.state.districts['AMPARA']:0+this.state.districts['KALMUNAI']?this.state.districts['KALMUNAI']:0

                        }
                      
                      ] 
                    }
                  ]
                }}
              />

                </Card.Body>
                </Card>
                </Col>
                <Col md="3">
                <Card className="text-center" style={{height:"550px"}}>
                <Card.Header>
                    <Card.Title as="h5"> Hospital statistics by District</Card.Title>
                </Card.Header>
                <Card.Body>
                <DropdownButton id="dropdown-basic-button" title="Select District"  onSelect={this.handleSelect}>
                  <Dropdown.Item eventKey="4">Colombo</Dropdown.Item>
                  <Dropdown.Item eventKey="6">Gampaha</Dropdown.Item>
                  <Dropdown.Item eventKey="9">Kalutara</Dropdown.Item>
                  <Dropdown.Item eventKey="19">Polonnaruwa</Dropdown.Item>
                  <Dropdown.Item eventKey="0">Ampara</Dropdown.Item>
                  <Dropdown.Item eventKey="1">Anuradhapura</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Badulla</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Batticaloa</Dropdown.Item>
                  <Dropdown.Item eventKey="5">Galle</Dropdown.Item>
                  <Dropdown.Item eventKey="7">Hambantota</Dropdown.Item>
                  <Dropdown.Item eventKey="8">Jaffna</Dropdown.Item>
                  <Dropdown.Item eventKey="10">Kandy</Dropdown.Item>
                  <Dropdown.Item eventKey="11">Kegalle</Dropdown.Item>
                  <Dropdown.Item eventKey="12">Kilinochchi</Dropdown.Item>
                  <Dropdown.Item eventKey="13">Kurunegala</Dropdown.Item>
                  <Dropdown.Item eventKey="14">Mannar</Dropdown.Item>
                  <Dropdown.Item eventKey="24">Matale</Dropdown.Item>
                  <Dropdown.Item eventKey="15">Matara</Dropdown.Item>
                  <Dropdown.Item eventKey="16">Monaragala</Dropdown.Item>
                  <Dropdown.Item eventKey="17">Mullaitivu</Dropdown.Item>
                  <Dropdown.Item eventKey="18">Nuwara Eliya</Dropdown.Item>
                  <Dropdown.Item eventKey="20">Puttalam</Dropdown.Item>
                  <Dropdown.Item eventKey="21">Ratnapura</Dropdown.Item>
                  <Dropdown.Item eventKey="22">Trincomalee</Dropdown.Item>
                  <Dropdown.Item eventKey="23">Vavuniya</Dropdown.Item>   
                  </DropdownButton>
                  <br/>
                  <div>
                    <img src={images[this.state.selectedDistrict]} style={{maxHeight:"100%",maxWidth:"100%"}} />
                  </div> 
                  <br/>
                  <div>
                    <b>
                    Cumulative local <br/>
                    {this.state.total1} <br/>
                    Cumulative foriegn <br/>
                    {this.state.total2}<br/>
                    Treatment local <br/>
                    {this.state.total3}<br/>
                    Treatment foreign<br/>
                    {this.state.total4}<br/>                    
                    </b>
                  </div>
                </Card.Body>
                </Card>
                </Col>
                <Col md="3">
                <Card style={{height:"550px"}}>
                <Card.Header>
                    <Card.Title as="h5" style={{textAlign:"center"}}> Hospital data from</Card.Title>
                </Card.Header>
                <br/>
                <Card.Body>
                  {this.state.Harray.map(function(item){                                
                    return  (
                      <b>
                        {'\u2022'}
                        {item.HospitalArray}<br/>
                      </b>
                    );
                  })}
                </Card.Body>
                </Card>
                </Col>
                </Row>
                </Container>
        </>
    )
  }
}

export default Maps;