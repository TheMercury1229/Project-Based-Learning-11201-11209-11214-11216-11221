import React, { useEffect, useState } from "react";
import "../Css/Home.css";
import Subject from "../../Components/StudentComponents/Subject-Card/Subject.jsx";
import TimeTable from "../../Components/StudentComponents/TimeTable/Timetable.jsx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { attendanceState } from "../../store/attendance.js";
// import TimeTable from "../Components/Table/Table";
const Home = () => {
  const attendance = useRecoilValue(attendanceState);
  const setAttendance = useSetRecoilState(attendanceState);
  console.log("the attendance is : ");
  console.log("this is in the home.jsx");
  console.log(attendance);
  useEffect(()=>{
    console.log("useEffect in the home ran")
    fetch("http://localhost:3000/attendance/getAllSubjectAttendance" , {
      method : 'GET' ,
      headers : {
        "Content-type" : "application/json",
        "token" : localStorage.getItem("token")
      }
    }).then((response)=>{
      response.json().then((data)=>{
        const result = data.data;
        if(!result){
          console.log("there was an error in the Home.jsx")
        }else{
          console.log(result);
          setAttendance(result);
          
        }
      })
    })

  },[])
  return (
    <>
      <h1 className=" text-4xl ">Attendance</h1>
      <div className="subjects">
        <Subject
          subCode="eg"
          subName="Enginnering Graphics"
          presentlec={attendance.EG.attended}
          totalLec={attendance.EG.conducted}
          percent={attendance.EG.attendance}
          icon={"draw"}
        />
        <Subject
          subCode="mth"
          subName="Enginnering Mathematics-2"
          presentlec={attendance.EM2.attended}
          totalLec={attendance.EM2.conducted}
          percent={attendance.EM2.attendance}
          icon={"functions"}
        />
        <Subject
          subCode="cs"
          subName="Enginnering Physics"
          presentlec={attendance.PHY.attended}
          totalLec={attendance.PHY.conducted}
          percent={attendance.PHY.attendance}
          icon={"biotech"}
        />
        <Subject
          subCode="cg"
          subName="Enginnering Mechanics"
          presentlec={attendance.EM.attended}
          totalLec={attendance.EM.conducted}
          percent={attendance.EM.attendance}
          icon={"architecture"}
        />
        <Subject
          subCode="mth"
          subName="Basic Electrical Enginnering"
          presentlec={attendance.BEE.attended}
          totalLec={attendance.BEE.conducted}
          percent={attendance.BEE.attendance}
          icon={"mode"}
        />
      </div>

      <h1 className=" text-4xl my-10">Timetable</h1>
      <TimeTable />
    </>
  );
};

export default Home;
