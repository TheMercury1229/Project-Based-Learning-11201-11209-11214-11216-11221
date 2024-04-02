import {
  FaHome,
  FaUser,
  FaCog,
  FaClipboardCheck,
  FaChartLine,
} from "react-icons/fa";

const NavigationLinks = [
  {
    label: "Home",
    url: "/home",
    icon: "<FaHome />",
  },
  {
    label: "Profile",
    url: "/profile",
    icon: "<FaUser />",
  },
  {
    label: "Settings",
    url: "/settings",
    icon: "<FaCog />",
  },
  {
    label: "Attendance",
    url: "/attendance",
    icon: "<FaClipboardCheck />",
  },
  {
    label: "Marks",
    url: "/marks",
    icon: <FaChartLine />,
  },
];

export default NavigationLinks;
