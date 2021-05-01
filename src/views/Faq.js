import React, {useState} from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Accordion
} from "react-bootstrap";

function Faq() {

  const [covidFaq, setCovidFaq] = useState([
    {
      id: 1,
      question: 'What is COVID-19?',
      answer: 'COVID-19 is a new disease, caused by a novel (or new) coronavirus that has not previously been seen in humans. Because it is a new virus, scientists are learning more each day. Although most people who have COVID-19 have mild symptoms, COVID-19 can also cause severe illness and even death. Some groups, including older adults and people who have certain underlying medical conditions, are at increased risk of severe illness.'
    },
    {
      id: 2,
      question: 'How does the virus spread?',
      answer: 'COVID-19 is thought to spread mainly through close contact from person to person, including between people who are physically near each other (within about 6 feet). People who are infected but do not show symptoms can also spread the virus to others. COVID-19 spreads very easily from person to person. How easily a virus spreads from person to person can vary. The virus that causes COVID-19 appears to spread more efficiently than influenza but not as efficiently as measles, which is among the most contagious viruses known to affect people.'
    },
    {
      id: 3,
      question: 'What are the symptoms and complications that COVID-19 can cause?',
      answer:'People with COVID-19 have reported a wide range of symptoms – from mild symptoms to severe illness. Symptoms may appear 2-14 days after exposure to the virus. If you have fever, cough, or other symptoms, you might have COVID-19.'
    },
    {
      id: 4,
      question: 'Who is at increased risk for developing severe illness from COVID-19?',
      answer:'People at increased risk include older adults, people of all ages with certain underlying medical conditions. Pregnant people are also at increased risk for severe illness from COVID-19. Long-standing systemic health and social inequities have put many people from racial and ethnic minority groups at increased risk of getting sick and dying from COVID-19. In addition to those at increased risk, there are certain groups of people who require extra precautions during the pandemic.'
    },
    {
      id: 5,
      question: 'Are there any medications I should avoid taking if I have COVID-19?',
      answer:'Currently, there is no evidence to suggest that taking any specific medications leads to more severe illness from COVID-19. Continue to take your medications and to follow your treatment plan as prescribed by your healthcare provider. Any changes to your medications should only be made after talking with your healthcare provider. Contact your healthcare provider if you have questions or concerns.'
    }
  ])
  
  const [vaccineFaq, setVaccineFaq] = useState([
    {
      id: 1,
      question: 'What is the COVID-19 vaccine?',
      answer: 'Most vaccines consist mainly of antigen, adjuvants, preservatives & stabilizers. In COVID -19 vaccine the antigen is a killed form of the virus which trains our bodies to recognize and fight against COVID -19 if we encounter it in the future.'
    },
    {
      id: 2,
      question: 'How does the COVID-19 vaccine work?',
      answer: 'The vaccine carries a non-living part of the virus (a protein found on the surface of the virus) which is used to build resistance to the virus, using our body’s natural defenses. Strong immune responses and memory is developed by special immune cells named B and T cells. If the person is infected later on by the virus, these cells remember the virus and attack it, protecting the person from COVID-19.'
    },
    {
      id: 3,
      question: 'What are the possible side effects of COVID-19 vaccine?',
      answer:'The COVID-19 vaccine as with all other vaccines in use, can have side effects. It may cause minor and temporary side effects, such as injection site pain, mild fever, muscle pain, headache and sometimes chills. More serious side- effects are possible, but very rare.'
    },
    {
      id: 4,
      question: 'Is COVID-19 vaccine safe?',
      answer:'As with all vaccines, COVID -19 vaccine also needs to meet rigorous criteria for safety and effectiveness. All vaccines go through rigorous studies to ensure they are safe before being approved for use. '
    },
    {
      id: 5,
      question: 'Who is not eligible for the COVID-19 vaccine?',
      answer:' Pregnant mothers, breastfeeding mothers, those below the age of 18 years, those with previous allergic reactions to vaccination (medical advice should be obtained regarding vaccination of such persons), those allergic to any component of the vaccine, or with severe allergy/ anaphylaxis to other pharmaceutical product or food item (requiring hospitalization). If any allergic history, better to vaccinate in a hospital under medical care'
    }
  ])

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Frequently Asked Questions - COVID'19</Card.Title>
              </Card.Header>
              <Card.Body>
              <Accordion defaultActiveKey="1">
                {covidFaq.map((faq, i) => (
                  <Card key={i}>
                    <Accordion.Toggle as={Button} variant="outline-secondary" eventKey={faq.id}>
                      {faq.question}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={faq.id}>
                      <Card.Body>{faq.answer}</Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Frequently Asked Questions - COVID'19 Vaccine</Card.Title>
              </Card.Header>
              <Card.Body>
              <Accordion defaultActiveKey="1">
                {vaccineFaq.map((faq, i) => (
                  <Card key={i}>
                    <Accordion.Toggle as={Button} variant="outline-secondary" eventKey={faq.id}>
                      {faq.question}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={faq.id}>
                      <Card.Body>{faq.answer}</Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Faq;
