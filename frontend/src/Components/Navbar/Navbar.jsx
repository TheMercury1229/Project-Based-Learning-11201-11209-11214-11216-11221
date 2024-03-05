import React from "react";
import "./Navbar.css";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import profileImg from "../../assets/Profileimage.webp";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="nav-list">
        <li className="nav-links">
          <button>
            <MdDarkMode className="darkIcon" />
            <MdLightMode className="lightIcon" />
          </button>
        </li>
        <li className="nav-links">
          <Link to="/profile" title="Go To Profile Page">
            <img src={profileImg} className="avatar" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
