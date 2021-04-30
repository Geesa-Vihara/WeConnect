import React, { Component, createContext } from "react";
import Firebase, {db, provider} from '../firebase';

export const UserContext = createContext({ uid: null, userType: null });

class UserProvider extends Component {
  state = {
    uid: null,
    userType: null
  };

  componentDidMount = () => {
    Firebase.auth().onAuthStateChanged(async user => {
        if (user) { 
            console.log(user.uid)
            const ref = db.collection('admins').doc(user.uid);
            const doc = await ref.get();
            var type = null
            if (doc.exists) {
                console.log('admin');
                type = 'admin'
            } else {
                console.log('user');
                type = 'user'
            }
            this.setState({ uid: user.uid, userType: type});
          } 
          else { 
            this.setState({ uid: null, userType: null })
          }
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;