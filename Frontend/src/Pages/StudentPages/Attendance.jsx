import React from "react";
import Subject from "../../Components/StudentComponents/Subject-Card/Subject";
import "../Css/Attendance.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useRecoilValue } from "recoil";
import { attendanceState } from "../../store/attendance";

const Attendance = () => {
  const attendance = useRecoilValue(attendanceState);

  const dataTheory = [
    // {
    //   name: "Overall",
    //   Attended: attendance.overallTheoryAttendance.attended,
    //   Conducted: attendance.overallTheoryAttendance.conducted
    // },
    {
      name: "Mechanics",
      Attended: attendance.EM.attended,
      Conducted: attendance.EM.conducted
    },
    {
      name: "Graphics",
      Attended: attendance.EG.attended,
      Conducted: attendance.EG.conducted
    },
    {
      name: "Physics",
      Attended: attendance.PHY.attended,
      Conducted: attendance.PHY.conducted
    },
    {
      name: "Mathematics",
      Attended: attendance.EM2.attended,
      Conducted: attendance.EM2.conducted
    },
    {
      name: "BEE",
      Attended: attendance.BEE.attended,
      Conducted: attendance.BEE.conducted
    },

    {
      name: "CS",
      Attended: attendance.CS.attended,
      Conducted: attendance.CS.conducted
    },
  ];
  const labTheory = [
    // {
    //   name: "Overall",
    //   Attended : attendance.overallPracticalAttendance.attended,
    //   Conducted : attendance.overallPracticalAttendance.conducted
    // },
    {
      //EM-2
      name: "EM2",
      Attended : attendance.EM2Lab.attended,
      Conducted : attendance.EM2Lab.conducted
    },
    {
      //PHYLab
      name: "PHY",
      Attended : attendance.PHYLab.attended,
      Conducted : attendance.PHYLab.conducted
    },
    {
      //Mechanis
      name: "EM",
      Attended : attendance.EMLab.attended,
      Conducted : attendance.EMLab.conducted
    },
    {
      //Bee
      name: "BEE",
      Attended : attendance.BEELab.attended,
      Conducted : attendance.BEELab.conducted
    },
    {
      //Graphics
      name: "EG",
      Attended : attendance.EGLab.attended,
      Conducted : attendance.EGLab.conducted
    },

    {
      //Cad
      name: "CAD",
      Attended : attendance.CADLab.attended,
      Conducted : attendance.CADLab.conducted
    },
    {
      //pbl
      name: "PBL",
      Attended : attendance.PBLLab.attended,
      Conducted : attendance.PBLLab.conducted
    },
  ];

  return (
    <>
      <div className="attendance">
        <div className="attendance-top">
          <h1 className=" text-4xl">Attendance</h1>
          <div className="theory">
            <h2 className="text-muted sub-heading text-2xl">Theory</h2>
            <div className="subjects">
              <Subject
                subCode="mth"
                subName="Overall Attendance"
                presentlec={attendance.overallTheoryAttendance.attended}
                totalLec={attendance.overallTheoryAttendance.conducted}
                percent={attendance.overallTheoryAttendance.attendance}
                icon={"pie_chart"}
              />
              <Subject
                subCode="cg"
                subName="Enginnering Mathematics-2"
                presentlec={attendance.EM2.attended}
                totalLec={attendance.EM2.conducted}
                percent={attendance.EM2.attendance}
                icon={"functions"}
              />
              <Subject
                subCode="net"
                subName="Enginnering Physics"
                presentlec={attendance.PHY.attended}
                totalLec={attendance.PHY.conducted}
                percent={attendance.PHY.attendance}
                icon={"biotech"}
              />
              <Subject
                subCode="cs"
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
              <Subject
                subCode="mth"
                subName="Enginnering Graphics"
                presentlec={attendance.EG.attended}
                totalLec={attendance.EG.conducted}
                percent={attendance.EG.attendance}
                icon={"draw"}
              />
              <Subject
                subCode="cs"
                subName="Communication Skills"
                presentlec={attendance.CS.attended}
                totalLec={attendance.CS.conducted}
                percent={attendance.CS.attendance}
                icon={"hub"}
              />
            </div>
            <div className="attendance-chart">
              <BarChart width={900} height={300} data={dataTheory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Attended" fill="#8884d8" />
                <Bar dataKey="Conducted" fill="#82ca9d" />
              </BarChart>
            </div>
          </div>
          <div className="lab">
            <h2 className="text-muted sub-heading text-4xl">Lab</h2>
            <div className="subjects">
              <Subject
                subCode="mth"
                subName="Overall Attendance"
                presentlec={attendance.overallPracticalAttendance.attended}
                totalLec={attendance.overallPracticalAttendance.conducted}
                percent={attendance.overallPracticalAttendance.attendance}
                icon={"pie_chart"}
              />
              <Subject
                subCode="cg"
                subName="Enginnering Mathematics-2"
                presentlec={attendance.EM2Lab.attended}
                totalLec={attendance.EM2Lab.conducted}
                percent={attendance.EM2Lab.attendance}
                icon={"functions"}
              />
              <Subject
                subCode="net"
                subName="Enginnering Physics"
                presentlec={attendance.PHYLab.attended}
                totalLec={attendance.PHYLab.conducted}
                percent={attendance.PHYLab.attendance}
                icon={"biotech"}
              />
              <Subject
                subCode="cs"
                subName="Enginnering Mechanics"
                presentlec={attendance.EMLab.attended}
                totalLec={attendance.EMLab.conducted}
                percent={attendance.EMLab.attendance}
                icon={"architecture"}
              />
              <Subject
                subCode="mth"
                subName="Basic Electrical Enginnering"
                presentlec={attendance.BEELab.attended}
                totalLec={attendance.BEELab.conducted}
                percent={attendance.BEELab.attendance}
                icon={"mode"}
              />
              <Subject
                subCode="net"
                subName="Enginnering Graphics"
                presentlec={attendance.EGLab.attended}
                totalLec={attendance.EGLab.conducted}
                percent={attendance.EGLab.attendance}
                icon={"draw"}
              />
              <Subject
                subCode="mth"
                subName="Computer Aided Design"
                presentlec={attendance.CADLab.attended}
                totalLec={attendance.CADLab.conducted}
                percent={attendance.CADLab.attendance}
                icon={"dvr"}
              />
              <Subject
                subCode="cs"
                subName="Project Based Learning"
                presentlec={attendance.PBLLab.attended}
                totalLec={attendance.PBLLab.conducted}
                percent={attendance.PBLLab.attendance}
                icon={"explore"}
              />
            </div>
            <div className="attendance-chart">
              <BarChart width={900} height={300} data={labTheory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Attended" fill="#8884d8" />
                <Bar dataKey="Conducted" fill="#82ca9d" />
              </BarChart>
            </div>
          </div>
        </div>
        <div className="attendance-bottom"></div>
      </div>
    </>
  );
};

export default Attendance;
