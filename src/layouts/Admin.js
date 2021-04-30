import React, { Component, useState }from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import Firebase, {db, provider} from '../firebase';

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import Chatbot from "components/ChatBot/Chatbot";

import routes from "routes.js";

import sidebarImage from "assets/img/sidebar-6.jpg";

function Admin() {

  const [isLoggedIn, setLogin] = useState(true);
  const [userType, setUser] = useState(null);

  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
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
      } 
      else { 
        setLogin(false)
        setUser(null)
      }
    })
    console.log("user", isLoggedIn)

    if(isLoggedIn && userType == 'admin') {
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

  if (isLoggedIn || userType=='admin') return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <Footer />
        </div>
      </div>
      <Chatbot />
    </>
  );
  return <Redirect to="/login" />;
}

export default Admin;
