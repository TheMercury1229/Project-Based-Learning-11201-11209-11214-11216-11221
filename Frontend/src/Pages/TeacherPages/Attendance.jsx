import React, { useEffect } from "react";
import { useState } from "react";
import "../TeacherCss/Css/Attendance.css";
import { DataGrid } from "@mui/x-data-grid";
import { useGridApiRef } from "@mui/x-data-grid";
import Button from "../../Components/Button/Button";
import { teacherState } from "../../store/teacher";
import { useRecoilValue ,useSetRecoilState } from "recoil";
const Attendance = () => {
  const apiRef = useGridApiRef();
  const teacher = useRecoilValue(teacherState)
  const setTeacher = useSetRecoilState(teacherState);
  const [rows , setRows] = useState(null);
  const columns = [
    { field: "id", headerName: "Roll No.", width: 200 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "attendance", headerName: "Subject Attendance", width: 300 },
    {
      field: "msg",
      headerName: "Status",
      width: 300,
    },
  ];
  useEffect(()=>{
        fetch("http://localhost:3000/attendance/dataOfTeacherAttendance" , {
        method : "POST" ,
        headers : {
          "Content-type" :"Application/json",
          "token" : localStorage.getItem("token"),
        },
        body : JSON.stringify({
          subjects: teacher.subjects
        })
        }).then((response)=>{
          response.json().then((data)=>{
            if(data.data)
            {
              // console.log("got the data for the subject " , subject , "for the index " , index);
              setRows(data.data)
            }
            else{
              setRows(null);
            }
          })
        })
    
  },[])
  //  Checking for if the row is checked or not
  const [selection, setSelection] = useState([]);
  //  Function to handle the row selecting
  const handleSelectionChange = (newSelection) => {
    // Extracting IDs of newly selected rows
    console.log(newSelection);
    setSelection(newSelection);
  };
  // function to log the ids selected
  const markAttendanceHandler = (subject) => {
    console.log(subject);
    console.log(selection);
    fetch("http://localhost:3000/attendance/teacherMarkAttendance" , {
      method : "POST",
      headers : {
        "Content-type" : "Application/json",
        token : localStorage.getItem("token"),

      },
      body : JSON.stringify({
        students : selection,
        subject : subject
      })
    }).then((response)=>{
      response.json().then((data)=>{
        if(data.result)
        {
          alert("updated succesffuly")
          console.log("updated successfully");
        }else{
          console.log("something went wrong");
        }
      })
    })

  };
  // console.log(rows[0]);
  return (
    <>
    {
      teacher.subjects && teacher.subjects.map((subject,index)=>(
        <section className="attendance">
        <div className="top">
          <h1>Mark Attendance</h1>
          <div className="sub-heading">
            <h3>
              Sub-Name: <span>{subject}</span>
            </h3>
            <h3>
              Class: <span>FE-12</span>
            </h3>
          </div>
        </div>
        <div className="middle">
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={rows ? rows[index] : [{id : 11201,name : "vivek" ,  attendance : 74 , msg : "Clear"}]} 
              columns={columns}
              checkboxSelection
              className="attendance-div"
              sx={{
                boxShadow: 2,
                marginInline: "auto",
                color: "var(--color-dark)",
                fontSize: "17px",
                textAlign: "center",
                "& .MuiDataGrid-cell:hover": {
                  color: "#545dae;",
                  fontWeight: "600",
                },
              }}
              onRowSelectionModelChange={(row) => handleSelectionChange(row)}
            />
          </div>
        </div>
        <div className="bottom">
          <Button text="Mark Attendance"  onClick={() => markAttendanceHandler(subject)} />
        </div>
      </section>
      ))
    }
    
    
    </>
  );
};

export default Attendance;
