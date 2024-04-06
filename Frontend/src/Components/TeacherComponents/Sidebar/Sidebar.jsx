import React from "react";
import "./Sidebar.css";
import profileImg from "../../../assets/assets/Profileimage.webp";
import { teacherState } from "../../../store/teacher";
import { useRecoilValue } from "recoil";
const Sidebar = () => {
  const teacher = useRecoilValue(teacherState)
  const sidebarItems = [
    {
      title: "Course",
      content: " BE. Artificial Intelligence And Data Science",
    },
    { title: "DOB", content: "28-Feb-2004" },
    { title: "Contact", content: "1234567890" },
    { title: "Email", content: "abc@gmail.com" },
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
              Hey, <strong>{teacher.name}</strong>{" "}
            </p>
            <small className="text-muted">{teacher.id}</small>
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
