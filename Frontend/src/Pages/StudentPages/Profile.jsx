import React from "react";
import "../Css/Profile.css";
import profileImg from "../../assets/assets/Profileimage.webp";
import Button from "../../Components/Button/Button";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { studentState } from "../../store/student";
import { userState } from "../../store/user";



const Profile = () => {
  const student = useRecoilValue(studentState)
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);

  console.log("the student is :");
  console.log(student);
  console.log(user);
  const handleLogout = () => {
    console.log("Logout");
    localStorage.removeItem("token");
    const object = {
      user_id : user.user_id,
      user_type : user.user_type,
      loggedIn : '0'
    }
    
    setUser(object);
    window.location="/login"
  };
  const handleEdit = () => {
    console.log("Edited Button");
  };
  const profileList = [
    { key: "Name", value: student.name },
    { key: "Age", value: 20 },
    { key: "Email", value: student.email },
    { key: "Roll No", value: student.rollno },
    { key: "Address", value: "Ghost town Road, New York, America" },
    { key: "Course", value: "BE. Artificial Intelligence And Data Science" },
    { key: "Class", value: "FE-12" },
    { key: "Contact Number", value: "1234567890" },
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
