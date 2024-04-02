import React, { useEffect } from "react";
import "./Sidebar.css";
import profileImg from "../../../assets/assets/Profileimage.webp";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { studentState } from "../../../store/student";
const Sidebar = () => {
  const student = useRecoilValue(studentState);
  const setStudent = useSetRecoilState(studentState);
  console.log("this is the side bar component and this is the student")
  console.log(student);
  const sidebarItems = [
    {
      title: "Course",
      content: " BE. Artificial Intelligence And Data Science",
    },
    { title: "DOB", content: "28-Feb-2004" },
    { title: "Contact", content: "1234567890" },
    { title: "Email", content: student.email },
    { title: "Address", content: "Ghost town Road, New York, America" },
  ];
  return (
    <aside>
      <div className="profile">
        <div className="top">
          <div className="profile-photo">
            <img src={profileImg} alt="StudentImg" />
          </div>
          <div className="info">
            <p>
              Hey, <strong>{student.name}</strong>{" "}
            </p>
            <small className="text-muted">{student.rollno}</small>
          </div>
        </div>
        <div className="about">
          {sidebarItems.map((item) => (
            <div key={item.title}>
              <h5>{item.title}</h5>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
