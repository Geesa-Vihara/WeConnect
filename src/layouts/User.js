import React, { Component, useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import Firebase, {db, provider} from '../firebase';

import UserNavbar from "components/Navbars/UserNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes-user.js";

import sidebarImage from "assets/img/sidebar-6.jpg";

import { getAuthStatus } from "../actions/auth.js";

function User() {

  const [isLoggedIn, setLogin] = useState(true);
  const [userType, setUser] = useState(null);
  const [uid, setUid] = useState(null);

  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/user") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
    // const authStatus =  getAuthStatus()
    //   if(authStatus){
    //     setLogin(true)
    //   }
    //   else{
    //     setLogin(false)
    //   }
    Firebase.auth().onAuthStateChanged(async (user) => {
      if (user) { 
        const ref = db.collection('admins').doc(user.uid);
        const doc = await ref.get();
        var type = null
        if (doc.exists) {
            console.log('type=admin');
            type = 'admin'
        } else {
            console.log('type=user');
            type = 'user'
        }
        setLogin(true);
        setUser(type)
        setUid(user.uid)
      } 
      else { 
        setLogin(false)
        setUser(null)
      }
    })
    console.log("user", isLoggedIn)

    if(isLoggedIn && userType == 'user'){
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainPanel.current.scrollTop = 0;
      if (
        window.innerWidth < 993 &&
        document.documentElement.className.indexOf("nav-open") !== -1
      ) {
        document.documentElement.classList.toggle("nav-open");
        var element = document.getElementById("bodyClick");
        element.parentNode.removeChild(element);
      }
    }
  }, [location]);

  if (isLoggedIn || userType=='user') return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} userType={userType} uid={uid}/>
        <div className="main-panel" ref={mainPanel}>
          <UserNavbar />
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <Footer />
        </div>
      </div>
      <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      />
    </>
  );

  return <Redirect to="/login" />;
}

export default User;
