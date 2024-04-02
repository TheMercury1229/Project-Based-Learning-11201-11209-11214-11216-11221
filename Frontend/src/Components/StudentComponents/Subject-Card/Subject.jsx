import React from "react";
import "./Subject.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Subject = ({ subCode, subName, presentlec, totalLec, icon, percent }) => {
  return (
    <div className={subCode}>
      <span className="material-icons-sharp">{icon}</span>
      <h3>{subName}</h3>
      <h2>
        {presentlec}/{totalLec}{" "}
      </h2>
      <div className="progress" style={{ width: "80px", height: "80px" }}>
        <CircularProgressbar
          value={percent}
          text={`${percent}%`}
          styles={buildStyles({
            pathColor: "#7380ec",
            trailColor: "lightgrey",
            textColor: "grey",
          })}
        />
      </div>
      
    </div>
  );
};

export default Subject;
