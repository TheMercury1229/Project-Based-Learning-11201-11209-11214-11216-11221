import React from "react";
import Header from "../Components/StudentComponents/Header/Header";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./StudentPages/Home";
import Marks from "./StudentPages/Marks"
import Attendance from "./StudentPages/Attendance";
import Sidebar from "../Components/StudentComponents/Sidebar/Sidebar";
import Settings from "./StudentPages/Settings";
import Profile from "./StudentPages/Profile";
// import LoginS from "./LoginSignup";
import LoginSignup from "./LoginSignup";
const StudentOutlet = () => {
  // console.log("outlet rendered")
  const navigate = useNavigate();
  
  return (

    <div>
      
      
    
        <div className="container">
          <Header></Header>
          <Sidebar></Sidebar>
        
          <main>
            <Routes>
              {/* <Route path="/" element={<Header />} index /> */}
              {/* <Route path="/" element={<Sidebar />} index /> */}
              <Route path="/" element={<Home />} index />
              <Route path="/student/marks" element={<Marks />} />
              <Route path="/student/attendance" element={<Attendance />} />
              <Route path="/student/settings" element={<Settings />} />
              <Route path="/student/profile" element={<Profile />} />
              <Route path="/login" element={<LoginSignup />} />
            </Routes>
          </main>
        </div>
        
    </div>
  );
};

export default StudentOutlet;
