import Dashboard from "views/Dashboard.js";
import CovidDashboard from "views/CovidDashboard";
import UserProfile from "views/UserProfile.js";
import Profile from "views/Profile"
import Notifications from "views/Notifications.js";
import Faq from "views/Faq";
import ChatUser from "views/ChatUser";
import Maps from "views/Maps.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: CovidDashboard,
    layout: "/user",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/user",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: Profile,
    layout: "/user",
  },
  {
    path: "/chat",
    name: "Chat Room",
    icon: "nc-icon nc-bell-55",
    component: ChatUser,
    layout: "/user",
  },
  {
    path: "/faq",
    name: "FAQ",
    icon: "nc-icon nc-paper-2",
    component: Faq,
    layout: "/user",
  },
];

export default dashboardRoutes;
