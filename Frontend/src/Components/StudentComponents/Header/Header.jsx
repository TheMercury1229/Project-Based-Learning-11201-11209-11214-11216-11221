import React, { useState } from "react";
import { useContext } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../../assets/assets/finalLogo.jpg";
import { DarkModeContext } from "../../../Context/darkModeContext";
const Header = () => {
  const navLinks = [
    {
      name: "Home",
      icon: <FaHome />,
      link: "/",
    },
    {
      name: "Attendance",
      icon: <FaChartLine />,
      link: "/student/attendance",
    },
    {
      name: "Marks",
      icon: <FaGraduationCap />,
      link: "/student/marks",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      link: "/student/profile",
    },
    {
      name: "Settings",
      icon: <IoSettings />,
      link: "/student/settings",
    },
  ];
  const [active, setActive] = useState("Home");
  const [theme, setTheme] = useState(true);
  const { dispatch } = useContext(DarkModeContext);
  return (
    <header>
      <div className="logo" title="GradeEdu">
        <img src={logo} alt="Main Logo" />
        <h2>
          Grade<span className="logo-chr">E</span>du
        </h2>
      </div>
      <ul className="navbar">
        {navLinks.map((nav, i) => (
          <li key={i} className="a">
            <Link
              onClick={() => setActive(nav.name)}
              to={nav.link}
              className={active === nav.name ? "active" : ""}
            >
              <span>{nav.icon}</span>
              <h3 className="icon">{nav.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
      <div id="profile-btn">
        <span className="material-icons-sharp">person</span>
      </div>
      <div className="theme-toggler">
        <span
          onClick={() => {
            setTheme(true);
            dispatch({ type: "LIGHT" });
          }}
          className={`material-icons-sharp ${theme ? "active" : ""} `}
        >
          light_mode
        </span>
        <span
          onClick={() => {
            setTheme(false);
            dispatch({ type: "DARK" });
          }}
          className={`material-icons-sharp ${theme ? "" : "active"}`}
        >
          dark_mode
        </span>
      </div>
    </header>
  );
};

export default Header;
