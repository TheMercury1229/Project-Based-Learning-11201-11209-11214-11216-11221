import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
import React, { useState } from "react";
import GetTimeTableData from "./GetTimeTableData";
import "./Timetable.css";
import { timeTableStudentState } from "../../../store/timeTable";
import { useRecoilValue, useSetRecoilState } from "recoil";


const TimeTable = () => {
  const timetableData = useRecoilValue(timeTableStudentState);
  console.log("the time table data is : ");
  console.log(timetableData);
  // const setTimeTableData = useSetRecoilState(timeTableStudentState)
  console.log(timetableData);
  const daysOfWeek = Object.keys(timetableData);
  console.log(daysOfWeek);
  // console.log("days of week is ",daysOfWeek);
  const date = new Date();
  const day = date.getDay();
  console.log(day);
  const [currentDay, setCurrentDay] = useState(day-1);

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
  const nameOfDay = daysOfWeek[currentDay];
  console.log("name of the day is : " , nameOfDay);
  let currentTimetable;
  if(nameOfDay == 'Monday')
  {
    currentTimetable = timetableData.Monday;
  }else if(nameOfDay == 'Tuesday')
  {
    currentTimetable = timetableData.Tuesday;
  }else if(nameOfDay == 'Wednesday')
  {
    currentTimetable = timetableData.Wednesday
  }else if(nameOfDay == 'Thursday')
  {
    currentTimetable = timetableData.Thursday
  }else if(nameOfDay == 'Friday')
  {
    currentTimetable = timetableData.Friday
  }else if(nameOfDay == 'Saturday')
  {
    currentTimetable = timetableData.Saturday
  }else if(nameOfDay == 'Sunday')
  {
    currentTimetable = timetableData.Sunday
  }
  
  console.log(currentTimetable);
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
