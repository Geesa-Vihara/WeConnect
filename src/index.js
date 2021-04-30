import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import UserProvider from "./providers/UserProvider"

import AdminLayout from "layouts/Admin.js";
import UserLayout from "layouts/User.js";
import Login from "views/Login.js";
import SignUp from "views/SignUp"

ReactDOM.render(
  <UserProvider>
  <BrowserRouter>
    <Switch>
      <Route path="/login" component= {Login} />
      <Route path="/signup" component= {SignUp} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/user" render={(props) => <UserLayout {...props} />} />
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>
  </UserProvider>,
  document.getElementById("root")
);
