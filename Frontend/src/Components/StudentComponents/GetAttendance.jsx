import React from 'react'
import { attendanceState } from '../store/attendance'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useEffect } from 'react'
const GetAttendance = () => {
    const attendanceAtom = useRecoilValue(attendanceState);
    const setAttendance = useSetRecoilState(attendanceState);
    // console.log(localStorage.getItem("token"))
    useEffect(()=>{
      console.log("useEffect in the GetAttendance ran")
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
            setAttendance(result);
          }
        })
      })
    },[])
  return (
    <></>
  )
}

export default GetAttendance;