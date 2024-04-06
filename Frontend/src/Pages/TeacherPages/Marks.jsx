import React, { useEffect, useState } from "react";
import "../TeacherCss/Css/Marks.css";
import { DataGrid } from "@mui/x-data-grid";
import Button from "../../Components/Button/Button";
import { useRecoilValue } from "recoil";
import { teacherState } from "../../store/teacher";

const Marks = () => {
  const teacher = useRecoilValue(teacherState);
  const [rows , setRows] = useState(null);
  // defining the rows and the columns of the dataset
  useEffect(()=>{
    fetch("http://localhost:3000/marks/dataOfTeacherMarks",{
      method : "POST" , 
      headers:{
        "Content-type" : "Application/json",
        "token" : localStorage.getItem("token")
      },
      body : JSON.stringify({
        subjects  : teacher.subjects
      })
    }).then((response)=>{
      response.json().then((data)=>{
        if(data.data){
          setRows(data.data) ;
        }
        else{
          setRows(null);
        }
      })
    })
  } , [])
  const [updateMarks, setUpdateMarks] = useState(true);
  const columns = [
    { field: "id", headerName: "Roll No.", width: 200 },
    { field: "name", headerName: "Name", width: 300 },
    {
      field: "marks",
      headerName: "Subject Marks",
      width: 300,
      editable: updateMarks,
    },
  ];
  const handleCellEditCommit = (params) => {
    const { row, field, value } = params;
    const updatedRow = { ...row, [field]: value }; 
    const updatedRows = rows.map((r) => (r.id === updatedRow.id ? updatedRow : r));
    setRows(updatedRows);
    console.log("the update is as follows");
    console.log(value);
    console.log(rows);
  };
   function handleSubmit(e,subject ,index){
    console.log(subject);
    console.log(rows[index]);
    const array = rows[index];
    fetch("http://localhost:3000/marks/updateMarks", {
      method : "POST" ,
      headers :{
        "Content-type" : "Application/json",
        token : localStorage.getItem("token"),
        subject : subject
      },
      body : JSON.stringify({
        array : array
      })
    }).then((response)=>{
      response.json().then((data)=>{
        if(data.result){
          alert("updated successfully")
        }else{
          console.log("something went wrong");
        }
      })
    })

   }
  return (
    <>
      {
        teacher.subjects && teacher.subjects.map((subject,index)=>(
          
            <section className="marks">
              <div className="top">
                <h1>Give Marks</h1>
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
                    rows={rows ? rows[index] : [{id : 11201,name : "Vivek" , marks : 30}] }
                    columns={columns} 
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
                    onCellEditCommit={handleCellEditCommit}
                    processRowUpdate={(updatedRow, originalRow) => {
                      // console.log(updatedRow);
                      const updatedRows = rows[index].map((row)=>{
                        if(updatedRow.id == row.id)
                        {
                          return updatedRow;
                        }else{
                          return row;
                        }
                      })
                      // console.log(updatedRows);
                      const update = rows.map((array, thisIndex)=>{
                        if(thisIndex == index)
                        {
                          return updatedRows;
                        }
                        else{
                          return array;
                        }
                      })
                      // console.log(update);
                      setRows(update);
                      // const updatedRows = rows.map((r) => (r.id == updatedRow.id ? updatedRow : r));
                      // console.log(updatedRows);
                    }}
                    onProcessRowUpdateError={()=>{console.log("error occured");}}
                  />
                </div>
              </div>
              <div className="bottom">
                <Button
                  text={`${updateMarks ? "Update Marks" : "Marks Updated"}`}
                  onClick={(e)=>{handleSubmit(e,subject ,index)}}
                />
              </div>
          </section>
        ))
      }
    </>
  );
};

export default Marks;
