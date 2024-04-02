import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
import React, { useState } from "react";
import GetTimeTableData from "./GetTimeTableData";
import "./Timetable.css";
import { timeTableStudentState } from "../../../store/timeTable";
import { useRecoilValue, useSetRecoilState } from "recoil";


const TimeTable = () => {
  const timetableData = useRecoilValue(timeTableStudentState);
  // const setTimeTableData = useSetRecoilState(timeTableStudentState)
  console.log(timetableData);
  const daysOfWeek = Object.keys(timetableData);
  const date = new Date();
  const day = date.getDay();
  const [currentDay, setCurrentDay] = useState(day);

  const handlePrevDay = () => {
    setCurrentDay((prevDay) =>
      prevDay > 0 ? prevDay - 1 : daysOfWeek.length - 1
    );
  };

  const handleNextDay = () => {
    setCurrentDay((prevDay) =>
      prevDay < daysOfWeek.length - 1 ? prevDay + 1 : 0
    );
  };

  const currentTimetable = timetableData[daysOfWeek[currentDay]];

  return (
    <div className="timetable-container">
      <GetTimeTableData></GetTimeTableData>
      <div className="timetable-header">
        <button onClick={handlePrevDay}>
          <GrFormPreviousLink size={32} className="icon" />
        </button>
        <h2>{daysOfWeek[currentDay]}</h2>
        <button onClick={handleNextDay}>
          <GrFormNextLink size={32} className="icon" />
        </button>
      </div>
      <table className="timetable-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Subject</th>
            <th>Type</th>
            <th>Room Number</th>
          </tr>
        </thead>
        <tbody>
          {currentTimetable.map((entry, index) => (
            <tr key={index}>
              <td>{entry.time}</td>
              <td>{entry.subject}</td>
              <td>{entry.type}</td>
              <td>{entry.roomNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
