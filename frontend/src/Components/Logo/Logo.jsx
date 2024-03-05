import React from "react";
import "./Logo.css";
import logo from "../../assets/finalLogo.jpg";
const Logo = () => {
  return (
    <div className="logo">
      <img src={logo} alt="" />
      GradeEdu
    </div>
  );
};

export default Logo;
