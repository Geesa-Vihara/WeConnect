import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Profile from "views/Profile"
import Notifications from "views/Notifications.js";
import Faq from "views/Faq";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
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
    path: "/notifications",
    name: "Chats",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
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
