import React from "react";
import "../TeacherCss/Css/Profile.css";
import profileImg from "../../assets/assets/Profileimage.webp";
import Button from "../../Components/Button/Button";
import { useRecoilValue } from "recoil";
import { teacherState } from "../../store/teacher";
const Profile = () => {
  const teacher = useRecoilValue(teacherState)
  const handleLogout = () => {
    console.log("Logout");
    localStorage.removeItem("token")
    window.location = "/login"
  };
  const handleEdit = () => {
    console.log("Edited Button");
  };
  const profileList = [
    { key: "Name", value: teacher.name },
    { key: "Age", value: 20 },
    { key: "Email", value: "abc@gmail.com" },
    { key: "ID", value: teacher.id },
    { key: "Address", value: "Ghost town Road, New York, America" },
    { key: "Subject", value: "BE. Artificial Intelligence And Data Science" },
    { key: "Class", value: "FE-12" },
    { key: "Contact Number", value: teacher.mobileno },
  ];
  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-left">
          <img src={profileImg} alt="Profile-Image" className="profile-img" />
          <div className="button-container">
            <Button text="Logout" onClick={handleLogout} />
            <Button text="Edit Profile" onClick={handleEdit} />
          </div>
        </div>
        <div className="profile-right">
          <ul className="profile-list">
            {profileList.map((item, i) => (
              <li className="profile-item" key={i}>
                <h2>{item.key}</h2>:&nbsp;
                <span className="text-muted">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
