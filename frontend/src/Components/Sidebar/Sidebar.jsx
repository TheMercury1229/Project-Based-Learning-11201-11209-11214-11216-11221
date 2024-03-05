import React from "react";
import "./Sidebar.css";
import Logo from "../Logo/Logo";
import { FaHome } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoPieChart } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import profileImg from "../../assets/Profileimage.webp";
import { userState } from "../../store/user";
import { useRecoilValue } from "recoil";
const Sidebar = () => {
  const user = useRecoilValue(userState);
  const navLink = [
    {
      title: "Home",
      icon: <FaHome className="nav-icon" />,
      link: "/home",
    },
    {
      title: "Attendance",
      icon: <FaChartBar className="nav-icon" />,
      link: "/attendance",
    },

    {
      title: "Marks",
      icon: <IoPieChart className="nav-icon" />,
      link: "/marks",
    },
    {
      title: "Settings",
      icon: <IoIosSettings className="nav-icon" />,
      link: "/settings",
    },
    {
      title: "Profile",
      icon: <FaUser className="nav-icon" />,
      link: "/profile",
    },
  ];
  return (
    <div className="sidebar">
      <nav>
        <div className="top">
          <Logo />
          <hr />
          <div className="profile">
            <div className="profile-img">
              <img src={profileImg} alt="profile-img" />
            </div>
            <div className="profile-desc">
              <p className="profile-text">
                Hey! <span className="bold-text">John</span>
              </p>
              <p className="profile-text">{user.user_id}</p>
            </div>
          </div>
        </div>
        <hr />

        <div className="center">
          <ul>
            {navLink.map((item, i) => {
              return (
                <Link
                  to={item.link}
                  key={i}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <li>
                    {item.icon}
                    <span>{item.title}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <hr />
        <div className="bottom">
          <Button text="Logout" />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
