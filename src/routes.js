import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Announcement from "views/Announcement.js";
import Profile from "views/Profile"
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Faq from "views/Faq";
import ChatUser from "views/ChatUser";
import CovidDashboard from "views/CovidDashboard.js";

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin",
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: CovidDashboard,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/announcement",
    name: "Announcements",
    icon: "nc-icon nc-notes",
    component: Announcement,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  {
    path: "/chat",
    name: "Chat Room",
    icon: "nc-icon nc-bell-55",
    component: ChatUser,
    layout: "/admin",
  },
  {
    path: "/faq",
    name: "FAQ",
    icon: "nc-icon nc-paper-2",
    component: Faq,
    layout: "/admin",
  },
];

export default dashboardRoutes;
