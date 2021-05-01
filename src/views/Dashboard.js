import React, { useState , useEffect } from 'react';
import ChartistGraph from "react-chartist";
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
  Form,
  OverlayTrigger,
  Tooltip,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import Header from "components/Navbars/AdminNavbar";

 

function Dashboard() {

  const [count, setState] = useState({
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
    total_pcr_testing_count:0,
    selectedDistrict: 4,
    cumulative_local:0,
    cumulative_foreign:0,
    total1 :0,
    total2 :0,
    total3 :0,
    total4 :0,
    total5 :0,
    total6 :0,
    Harray : [],
    c_local: 0,
  c_foreign:0,
  t_local :0,
  t_foreign :0,
  total_local : 0,
  total_foreign : 0,
  HospitalArray : [],
  

   
});

const images = [
  require("assets/img/Ampara.png"),   //1
  require("assets/img/Anuradhapura.png"),//2
  require("assets/img/Badulla.png"),//3
  require("assets/img/Batticaloa.png"), //4
  require("assets/img/Colombo.png"), //5
  require("assets/img/Galle.png"), //6
  require("assets/img/Gampaha.png"), //7 
  require("assets/img/Hambantota.png"),  //8
  require("assets/img/Jaffna.png"), // 9
  require("assets/img/Kalutara.png"), //10
  require("assets/img/Kandy.png"),  //11
  require("assets/img/Kegalle.png"), //12
  require("assets/img/Kilinochchi.png"), //13
  require("assets/img/Kurunegala.png"),  //14
  require("assets/img/Mannar.png"),  //15
  require("assets/img/Matara.png"),  //16
  require("assets/img/Moneragala.png"), //17
  require("assets/img/Mullaitive.png"), //18
  require("assets/img/Nuwara-Eliya.png"),  //19
  require("assets/img/Polonnaruwa.png"), //20
  require("assets/img/Puttalam.png"),  //21
  require("assets/img/Rathnapura.png"), //22
  require("assets/img/Trincomalee.png"), //23
  require("assets/img/Vavuniya.png"),  //24
  require("assets/img/Matale.png"),  //25
 
];



const thousands_separators = (num) => {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
};

const newsFetch = (id) =>{
  fetch(
    `https://hpb.health.gov.lk/api/get-current-statistical`
  )
  .then(res => res.json())
  .then(data => {

     
      // districtNO.c_local = c_local+ data.data.hospital_data[id-1].cumulative_local;
      // districtNO.c_foreign = c_foreign + data.data.hospital_data[id-1].cumulative_foreign;
      // districtNO.t_local = t_local + data.data.hospital_data[id-1].treatment_local;
      // districtNO.total_local = total_local + data.data.hospital_data[id-1].cumulative_total;
      // districtNO.total_foreign = total_foreign + data.data.hospital_data[id-1].treatment_total;
      // districtNO.HospitalArray= data.data.hospital_data[id-1].hospital.name;


      // count.Harray.push({HospitalArray})
      setState({
          // total1 : thousands_separators(districtNO.c_local),
          // total2 : thousands_separators(districtNO.c_foreign),
          // total3 : thousands_separators(districtNO.t_local),
          // total4 : thousands_separators(districtNO.t_foreign),
          // total5 : thousands_separators(districtNO.total_local),
          // total6 : thousands_separators(districtNO.total_foreign),
          // Harray : HospitalArray,
        });
      
  });
 }



const districtHospital = (item) => {
  setState({
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
          newsFetch(1);
          newsFetch(2);
          newsFetch(3);
          newsFetch(14);
          newsFetch(15);
          newsFetch(18);
          newsFetch(24);
          newsFetch(32);
          newsFetch(25);
          newsFetch(26);
          newsFetch(29);
   }else if(item == 0){
    //  newsFetch();
   }else if(item == 1){
          newsFetch(5);
   }else if(item == 2){
          newsFetch(13);
   }else if(item == 3){
          newsFetch(9);
         newsFetch(34);
   }
   else if(item == 5){
        newsFetch(4);
   }
   else if(item == 6){
          newsFetch(10);
          newsFetch(11);
          newsFetch(23);
          newsFetch(35);
          newsFetch(36);
   }
   else if(item == 7){
         newsFetch(19);
   }
   else if(item == 8){
        newsFetch(7);
   }
   else if(item == 9){
         newsFetch(22);
         newsFetch(33);
   }
   else if(item == 10){
         newsFetch(8);
   }
   else if(item == 11){
        //  newsFetch(9);
   }
   else if(item == 12){
        // newsFetch(9);
   }
   else if(item == 13){
         newsFetch(6);
   }
   else if(item == 14){
        // newsFetch();
   }
   else if(item == 15){
         newsFetch(28);
   }
   else if(item == 16){
        newsFetch(20);
   }
   else if(item == 17){
        // newsFetch(9);
   }
   else if(item == 18){
       // newsFetch(9);
   }
   else if(item == 19){
        newsFetch(16);
        newsFetch(21);
   }
   else if(item == 20){
        newsFetch(27);
        newsFetch(31);
   }
   else if(item == 21){
         newsFetch(12);
   }
   else if(item == 22){
        // newsFetch(9);
   }
   else if(item == 23){
        newsFetch(30);
   }
   else if(item == 24){
        // newsFetch(9);
   }
};

useEffect(() => {
  fetch(
    `https://hpb.health.gov.lk/api/get-current-statistical`
  )
  .then(res => res.json())
  .then(data => {


    console.log("global total cases = "+data.data.global_total_cases);

      setState({
        local_total_cases: thousands_separators(data.data.local_total_cases),
          global_total_cases: thousands_separators(data.data.global_total_cases),
          local_deaths : thousands_separators(data.data.local_deaths),
          local_new_cases : thousands_separators(data.data.local_new_cases),
          local_recovered :thousands_separators(data.data.local_recovered),
          local_active_cases : thousands_separators(data.data.local_active_cases),
          local_new_deaths : thousands_separators(data.data.local_new_deaths),
          local_total_number_of_individuals_in_hospitals : thousands_separators(data.data.local_total_number_of_individuals_in_hospitals),
          global_deaths : thousands_separators(data.data.global_deaths),
          global_new_cases : thousands_separators(data.data.global_new_cases),
          global_recovered : thousands_separators(data.data.global_recovered),
          global_new_deaths : thousands_separators(data.data.global_new_deaths),
          total_pcr_testing_count: thousands_separators(data.data.total_pcr_testing_count),
          isLoading: false,
        
        });
        // districtHospital(4);
    });
    
});



// const [districtNO,setValue]=useState({
//   c_local: 0,
//   c_foreign:0,
//   t_local :0,
//   t_foreign :0,
//   total_local : 0,
//   total_foreign : 0,
//   HospitalArray : [],
// });

const handleSelect=(e)=>{
  console.log(e);
  setValue(e);
    // c_local=0;
    // c_foreign=0;
    // t_local=0;
    // t_foreign=0;
    // total_local=0;
    // total_foreign=0;
    // HospitalArray = null;
    districtHospital(e);
};
  return (
    <>
      <Container fluid>
        <Row>
          <h2>Local Staticstics</h2>
        </Row>
        <Row>
       
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Total Cases</Card.Title>
              </Card.Header>
              <Card.Img variant="top" src="https://news.cgtn.com/news/2020-06-25/Studies-Wearing-masks-saves-lives-amid-COVID-19-RCcdxQoxVe/img/8704bedefaba4ee08e9d83df32fbda90/8704bedefaba4ee08e9d83df32fbda90.jpeg" />
              <Card.Body>
                <Card.Text style={{fontSize:20},{fontWeight:'bold'},{alignContent:'center'}}>
               {count.local_total_cases}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">New Cases</Card.Title>
              </Card.Header>
              <Card.Img variant="top" src="https://kairoscommunity.org.uk/wp-content/uploads/2020/10/w-cr-Kairos-Covid-19-temperature-check-copy.jpg" />
              <Card.Body>
              <Card.Text  style={{fontSize:20},{fontWeight:'bold'},{alignContent:'center'}}>
               {count.local_new_cases}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
              </Card.Footer>
            </Card>
          </Col>

          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Recovered</Card.Title>
              </Card.Header>
              <Card.Img variant="top" src="https://i.pinimg.com/736x/34/81/fc/3481fcd65a0e64146657ef18abb241aa.jpg" />
              <Card.Body>
              <Card.Text style={{fontSize:20},{fontWeight:'bold'},{alignContent:'center'}}>
              {count.local_recovered}
              </Card.Text>
              </Card.Body>
              <Card.Footer>
              </Card.Footer>
            </Card>
          </Col>
          
        </Row>
        <Row>
       
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Deaths</Card.Title>
              </Card.Header>
              <Card.Img variant="top" src="https://cdn.mos.cms.futurecdn.net/dvNfjRyADTRpsvbSXmyDAj-970-80.jpg.webp" />
              <Card.Body>
                <Card.Text className="stat-text">
                {count.local_deaths}
              </Card.Text>
              </Card.Body>
              <Card.Footer>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">New Deaths</Card.Title>
              </Card.Header>
              <Card.Img variant="top" src="https://images.indianexpress.com/2020/06/dead-body-2.jpg" />   
              <Card.Body>
                <Card.Text className="stat-text">
                {count.local_new_deaths}
              </Card.Text>
              </Card.Body>
              <Card.Footer>
              </Card.Footer>
            </Card>
          </Col>

          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Total PCR testing</Card.Title>
              </Card.Header>
              <Card.Img variant="top" src="https://news.ucdenver.edu/wp-content/uploads/2020/12/3906696-1288x726.jpg" />   
              <Card.Body>
                <Card.Text className="stat-text">
                {count.total_pcr_testing_count}
              </Card.Text>
              </Card.Body>
              <Card.Footer>
              </Card.Footer>
            </Card>
          </Col>
          
        </Row>

        <Row>
          <h2>Global Staticstics</h2>
        </Row>
        <Row>
       
       <Col md="4">
         <Card>
           <Card.Header>
             <Card.Title as="h4">Total Cases</Card.Title>
           </Card.Header>
           <Card.Img variant="top" src="https://news.cgtn.com/news/2020-06-25/Studies-Wearing-masks-saves-lives-amid-COVID-19-RCcdxQoxVe/img/8704bedefaba4ee08e9d83df32fbda90/8704bedefaba4ee08e9d83df32fbda90.jpeg" />
           <Card.Body>
                <Card.Text className="stat-text">
                  {count.global_total_cases}
                </Card.Text>
           </Card.Body>
           <Card.Footer>
           </Card.Footer>
         </Card>
       </Col>
       <Col md="4">
         <Card>
           <Card.Header>
             <Card.Title as="h4">New Cases</Card.Title>
           </Card.Header>
           <Card.Img variant="top" src="https://kairoscommunity.org.uk/wp-content/uploads/2020/10/w-cr-Kairos-Covid-19-temperature-check-copy.jpg" />
           <Card.Body>
                <Card.Text className="stat-text">
                {count.global_new_cases}
              </Card.Text>
              </Card.Body>
           <Card.Footer>
           </Card.Footer>
         </Card>
       </Col>

       <Col md="4">
         <Card>
           <Card.Header>
             <Card.Title as="h4">Recovered</Card.Title>
           </Card.Header>
           <Card.Img variant="top" src="https://i.pinimg.com/736x/34/81/fc/3481fcd65a0e64146657ef18abb241aa.jpg" />
           <Card.Body>
                <Card.Text className="stat-text">
                {count.global_recovered}
              </Card.Text>
              </Card.Body>
           <Card.Footer>
           </Card.Footer>
         </Card>
       </Col>
       
     </Row>
     <Row>
    
       <Col md="4">
         <Card>
           <Card.Header>
             <Card.Title as="h4">Deaths</Card.Title>
           </Card.Header>
           <Card.Img variant="top" src="https://cdn.mos.cms.futurecdn.net/dvNfjRyADTRpsvbSXmyDAj-970-80.jpg.webp" />
           <Card.Body>
                <Card.Text className="stat-text">
                {count.global_deaths}
              </Card.Text>
              </Card.Body>
           <Card.Footer>
           </Card.Footer>
         </Card>
       </Col>
       <Col md="4">
         <Card>
           <Card.Header>
             <Card.Title as="h4">New Deaths</Card.Title>
           </Card.Header>
           <Card.Img variant="top" src="https://images.indianexpress.com/2020/06/dead-body-2.jpg" />   
           <Card.Body>
                <Card.Text className="stat-text">
                {count.global_new_deaths}
              </Card.Text>
              </Card.Body>
           <Card.Footer>
           </Card.Footer>
         </Card>
       </Col>

     </Row>
     {/* <Row>
          <h2>District Staticstics</h2>
     </Row>
    <Row>
      <div>
      <DropdownButton id="dropdown-basic-button" title="Dropdown button"  onSelect={handleSelect}>
  <Dropdown.Item href="4">Colombo</Dropdown.Item>
  <Dropdown.Item href="6">Gampaha</Dropdown.Item>
  <Dropdown.Item href="9">Kalutara</Dropdown.Item>
  <Dropdown.Item href="19">Polonnaruwa</Dropdown.Item>
  <Dropdown.Item href="0">Ampara</Dropdown.Item>
  <Dropdown.Item href="1">Anuradhapura</Dropdown.Item>
  <Dropdown.Item href="2">Badulla</Dropdown.Item>
  <Dropdown.Item href="3">Batticaloa</Dropdown.Item>
  <Dropdown.Item href="5">Galle</Dropdown.Item>
  <Dropdown.Item href="7">Hambantota</Dropdown.Item>
  <Dropdown.Item href="8">Jaffna</Dropdown.Item>
  <Dropdown.Item href="10">Kandy</Dropdown.Item>
  <Dropdown.Item href="11">Kegalle</Dropdown.Item>
  <Dropdown.Item href="12">Kilinochchi</Dropdown.Item>
  <Dropdown.Item href="13">Kurunegala</Dropdown.Item>
  <Dropdown.Item href="14">Mannar</Dropdown.Item>
  <Dropdown.Item href="24">Matale</Dropdown.Item>
  <Dropdown.Item href="15">Matara</Dropdown.Item>
  <Dropdown.Item href="16">Monaragala</Dropdown.Item>
  <Dropdown.Item href="17">Mullaitivu</Dropdown.Item>
  <Dropdown.Item href="18">Nuwara Eliya</Dropdown.Item>
  <Dropdown.Item href="20">Puttalam</Dropdown.Item>
  <Dropdown.Item href="21">Ratnapura</Dropdown.Item>
  <Dropdown.Item href="22">Trincomalee</Dropdown.Item>
  <Dropdown.Item href="23">Vavuniya</Dropdown.Item>



</DropdownButton>

      </div>
    </Row> */}

    <Row>
    {/* <body>
        <div id="chart-container">Sri lanka map will load here!</div>
    </body> */}
      </Row>
        
      </Container>
    </>
  );

  


}



export default Dashboard;
