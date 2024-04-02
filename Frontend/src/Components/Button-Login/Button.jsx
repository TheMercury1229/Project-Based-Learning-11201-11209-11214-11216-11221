import React from "react";
import "./Button.css";
const Button = ({ text , onButtonClick}) => {
  return <button className="btn" onClick={onButtonClick}>{text}</button>;
};

export default Button;
