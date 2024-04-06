import React from "react";
// import Header from "../Components/Header/Header";
import Header from "../Components/TeacherComponents/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "../Components/TeacherComponents/Sidebar/Sidebar";
// Importing Pages
import Home from "./TeacherPages/Home";
import Marks from "./TeacherPages/Marks";
import Attendance from "./TeacherPages/Attendance";
import Profile from "./TeacherPages/Profile";
import LoginSignup from "./LoginSignup";

const Outlet = () => {
  return (
    <div>
      
        <Header />
        <div className="container">
          <Sidebar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} index />
              <Route path="/give-marks" element={<Marks />} />
              <Route path="/give-attendance" element={<Attendance />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<LoginSignup/>}/>
            </Routes>
          </main>
        </div>
      
    </div>
  );
};

export default Outlet;
