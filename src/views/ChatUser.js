import React, { useRef, useState } from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// react-bootstrap components
import {
  Alert,
  Badge,
  Button,
  Card,
  Modal,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import 'assets/css/chat.css';

import photoURL from 'assets/img/user.jpg';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

import firebase from 'firebase';
import Firebase, {db, provider} from '../firebase';

const auth = Firebase.auth();
const firestore = Firebase.firestore();

function ChatUser() {
  return (
    <>
      <Container fluid >
        <Card>
          <Card.Header>
            <Card.Title as="h4">Chat Room</Card.Title>
          </Card.Header>         
          <Card.Body className="chatCont">                    
            <ChatRoom />       
          </Card.Body>
        </Card>       
      </Container>
    </>
  );
}

function ChatRoom(){
    const dummy = useRef();
    const messageRef = firestore.collection('chats');
    const query = messageRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, {idField:'id'});

    const [formValue, setFormValue] =  useState('');

    const sendMessage = async(e) => {

        e.preventDefault();
    
        const {uid} = auth.currentUser;
    
        await messageRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid
        });
    
        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    
    }

    return(
        <>
        <main className='chatMain'>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
            <span ref={dummy}></span>
        </main>
        <div className="chatInside">
            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} className="chatInput" />
                <button type="submit" className="chatSubmit"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i></button>
            </form>
        </div>
        
        </>
    )



}



function ChatMessage(props) {

    const {text, uid} = props.message;

    const messageClass = uid === auth.currentUser.uid? 'sent' : 'recieved';

    return (
        <div className = { `message ${messageClass}`}>
            <img src ={photoURL} className="chatImg" />
            <p className="chatP">{text}</p>

        </div>
    )
}

export default ChatUser;
