import React from "react";
import "./Card.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Card = ({ heading, chartValue, link }) => {
  return (
    <div className="card">
      <h3 className="heading">{heading}</h3>
      <div className="chart-container">
        <CircularProgressbar
          className="progress-bar"
          value={chartValue}
          text={`${chartValue}%`}
          strokeWidth={4}
        />
      </div>
      <a href="#">{link}</a>
    </div>
  );
};

export default Card;
