import React from "react";
import "./Navbar.css";
import { FaHome, FaUser } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  const navLinks = [
    {
      name: "Home",
      icon: <FaHome />,
      link: "/",
    },
    {
      name: "Attendance",
      icon: <FaChartLine />,
      link: "/attendance",
    },
    {
      name: "Marks",
      icon: <FaGraduationCap />,
      link: "/marks",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      link: "/profile",
    },
    {
      name: "Settings",
      icon: <IoSettings />,
      link: "/settings",
    },
  ];
  return (
    <header>
      <div class="logo" title="GradeEdu">
        <Logo />
      </div>
      <nav class="navbar">
        <ul>
          {navLinks.map((item, i) => {
            <li key={i}>
              <Link to={item.link}>
                <span>{item.icon}</span>
                <h3>{item.title}</h3>
              </Link>
            </li>;
          })}
        </ul>
      </nav>
      <div id="profile-btn">
        <span class="material-icons-sharp">person</span>
      </div>
      <div class="theme-toggler">
        <span class="material-icons-sharp active">light_mode</span>
        <span class="material-icons-sharp">dark_mode</span>
      </div>
    </header>
  );
};

export default Navbar;
