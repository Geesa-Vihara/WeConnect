import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import cb from 'assets/img/chatbot.png'
import user from 'assets/img/user.jpg'
import Post from './Post'

// all available theme props
const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#0C506C',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#1690C2',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '353d46',
  };

// all available config props
const config ={
    width: "350px",
    height: "500px",
    floating: true,    
    botAvatar: cb,
    userAvatar: user,
    opened: true
};

class Chatbot extends Component {
  render() {
    return (
        <ThemeProvider theme={theme}>
         <ChatBot 
            speechSynthesis={{ enable: true, lang: 'en' }}
            headerTitle="WeConnect - Stay Safe and Connected"
            steps={[
            {
                id:'0', 
                message:'Welcome to WeConnect!',
                trigger:'1',
            },
            {
                id:'1', 
                message:'Your safety is our utmost importance', 
                trigger:'2',
            },
            {
                id:'2', 
                message:'Do you want to take a self test for COVID-19?', 
                trigger:'3',
            },
            {
                id:'3', 
                options:[
                {value:'y', label:'Yes', trigger:'4'},
                {value:'n', label:'No', trigger:'5'},
                ] 
            },
            {
                id:'4', 
                message:'Great! let\'s get started', 
                trigger:'7',
            },
            {
                id:'7', 
                message:'What is your gender?', 
                trigger:'gender',
            },
            {
                id:'gender', 
                options:[
                {value:'male', label:'Male', trigger:'9'},
                {value:'female', label:'Female', trigger:'9'},
                ] 
            },
            {
                id:'9', 
                message:'Are you 60 years of age or above?', 
                trigger:'age_60_and_above',
            },
            {
                id:'age_60_and_above', 
                options:[
                {value:'yes', label:'Yes', trigger:'11'},
                {value:'no', label:'No', trigger:'11'},
                ] 
            },
            {
                id:'11', 
                message:'In the past 2 weeks have you had a new onset of fever?', 
                trigger:'fever',
            },
            {
                id:'fever', 
                options:[
                {value:'1', label:'Yes', trigger:'13'},
                {value:'0', label:'No', trigger:'13'},
                ] 
            },
            {
                id:'13', 
                message:'Did you have a new or worsening cough in the past 2 weeks?', 
                trigger:'cough',
            },
            {
                id:'cough', 
                options:[
                {value:'1', label:'Yes', trigger:'15'},
                {value:'0', label:'No', trigger:'15'},
                ] 
            },
            {
                id:'15', 
                message:'In the past 2 weeks have you had a new onset of sore throat?', 
                trigger:'sore_throat',
            },
            {
                id:'sore_throat', 
                options:[
                {value:'1', label:'Yes', trigger:'17'},
                {value:'0', label:'No', trigger:'17'},
                ] 
            },
            {
                id:'17', 
                message:'In the past 2 weeks have you had a new onset of shortness of breath?', 
                trigger:'shortness_of_breath',
            },
            {
                id:'shortness_of_breath', 
                options:[
                {value:'1', label:'Yes', trigger:'19'},
                {value:'0', label:'No', trigger:'19'},
                ] 
            },
            {
                id:'19', 
                message:'Did you have a new or worsening headache in the past 2 weeks?', 
                trigger:'head_ache',
            },
            {
                id:'head_ache', 
                options:[
                {value:'1', label:'Yes', trigger:'21'},
                {value:'0', label:'No', trigger:'21'},
                ] 
            },
            {
                id:'21', 
                message:'Have you being in contact with an infected individual?', 
                trigger:'test_indication',
            },
            {
                id:'test_indication', 
                options:[
                {value:'Contact with confirmed', label:'Contact with confirmed individual', trigger:'23'},
                {value:'Abroad', label:'Contact in Abroad', trigger:'23'},
                {value:'Other', label:'Other', trigger:'23'},
                ] 
            },
            {
                id:'23', 
                message:'Do you wish to submit the test?', 
                trigger:'24'
            },
            {
                id:'24', 
                options:[
                {value:'y', label:'Yes', trigger:'25'},
                {value:'n', label:'No', trigger:'26'},
                ] 
            },
            {
                id: '26',
                message:'Your data was not submitted.', 
                end: true,
            },
            {
                id: '25',
                message:'Thank you! Your data was submitted successfully and you will recieve the results soon...', 
                trigger:'27'
            },
            {
                id: '27',
                component: <Post />,
                asMessage: true,
                delay:5000,
                end: true,
            },
            {
                id:'5', 
                message:'That\'s alright, let me know once you are ready to take the test', 
                trigger:'6',
            },
            {
                id:'6', 
                options:[
                {value:'ready', label:'Let\'s take the test', trigger:'4'},
                {value:'notready', label:'I don\'t want the test', trigger:'5'},
                ] 
            },
            ]}
        {...config}
      />
        </ThemeProvider>
    );
  }
       
}

export default Chatbot;

