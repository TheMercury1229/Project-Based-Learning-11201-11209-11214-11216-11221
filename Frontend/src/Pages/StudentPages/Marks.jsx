import React, { useEffect } from "react";
import Subject from "../../Components/StudentComponents/Subject-Card/Subject.jsx";
import "../Css/Marks.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { marksState } from "../../store/marks.js";

const Marks = () => {
  const marks = useRecoilValue(marksState);
  const setMarks = useSetRecoilState(marksState);
  useEffect(() => {
    fetch("http://localhost:3000/marks/getAllSubjectMarks" , {
      method : 'GET' , 
      headers : {
        "Content-type" : "Application/json",
        token : localStorage.getItem("token")
      }
    }).then((response)=>{
      response.json().then((data)=>{
        if(data){
          console.log("got the data");
          const marksFromBackend = data.marks;
          setMarks(marksFromBackend);
        }
      })
    })
  }, []);
  const data = [
    {
      name: "Maths-2",
      marks: marks.EM2.marks,
    },
    {
      name: "Physics",
      marks: marks.PHY.marks,
    },
    {
      name: "BEE",
      marks: marks.BEE.marks,
    },
    {
      name: "Mechanics",
      marks: marks.EM.marks,
    },
  ];

  return (
    <div className="marks">
      <h1 className=" text-4xl">Marks</h1>
      <div className="marks-top">
        <div className="subjects">
          <Subject
            subCode="mth"
            subName="Enginnering Mathematics-2"
            presentlec={marks.EM2.marks}
            totalLec={30}
            percent={marks.EM2.percentage}
            icon={"functions"}
          />
          <Subject
            subCode="cs"
            subName="Enginnering Physics"
            presentlec={marks.PHY.marks}
            totalLec={30}
            percent={marks.PHY.percentage}
            icon={"biotech"}
          />
          <Subject
            subCode="cg"
            subName="Enginnering Mechanics"
            presentlec={marks.EM.marks}
            totalLec={30}
            percent={marks.EM.percentage}
            icon={"architecture"}
          />
          <Subject
            subCode="mth"
            subName="Basic Electrical Enginnering"
            presentlec={marks.BEE.marks}
            totalLec={30}
            percent={marks.BEE.percentage}
            icon={"mode"}
          />
        </div>
      </div>
      <div className="marks-bottom">
        <AreaChart
          width={1000}
          height={250}
          data={data}
          margin={{ top: 40, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={1} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="1 1" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="marks"
            stroke="#8884d8"
            fillOpacity={0.5}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default Marks;
