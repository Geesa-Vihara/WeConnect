import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase';
import Firebase, {db, provider} from '../../firebase';

const auth = Firebase.auth();

class Post extends Component {
  constructor(props) {
    super(props);
    const { steps } = this.props;
    const { cough, fever, sore_throat, shortness_of_breath, head_ache, age_60_and_above, gender, test_indication} = steps;
    this.state =  { cough, fever, sore_throat, shortness_of_breath, head_ache, age_60_and_above, gender, test_indication, message_body:"" }; 
  }


  async componentDidMount() {
    var today = new Date(),
    date = today.getDate()+ '/' + (today.getMonth() + 1) + '/' + today.getFullYear() ;
    const userObject = {
      test_date:date,
      cough:this.state.cough.value,
      fever:this.state.fever.value,
      sore_throat:this.state.sore_throat.value,
      shortness_of_breath:this.state.shortness_of_breath.value,      
      head_ache:this.state.head_ache.value,
      age_60_and_above:this.state.age_60_and_above.value,
      gender:this.state.gender.value,
      test_indication:this.state.test_indication.value,
    };
    await axios.post(`https://weconnect-ampersand.herokuapp.com/predict`, userObject).then(async(res) => {
        var message=''
        if(res.status==200 && res.data.length!=0){
            if(res.data.prediction=='negative'){
                message='You were tested negative for COVID-19. Still make sure to follow the health and safety guidelines appropriately.'
            }else{
                message='You were tested positive for COVID-19. A health provider will contact you soon...'
                const {uid} = auth.currentUser;
                const msg={
                  text: "A health provider will be in touch with you soon...",
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                  uid:"0"
                }
                await db.collection('chats').add(msg);
            }
            this.setState({message_body:message})
        }

    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>{this.state.message_body}</div>
      );
    }
  };

  export default Post;