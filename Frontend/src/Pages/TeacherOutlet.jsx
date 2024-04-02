import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import LoginSignup from "./LoginSignup";
import TeacherHeader from "../Components/TeacherComponents/TeacherHeader/TeacherHeader";
import TeacherSidebar from "../Components/TeacherComponents/TeacherSidebar/TeacherSidebar";
import TeacherHome from "./TeacherPages/TeacherHome";
const TeacherOutlet = () => {
  const navigate = useNavigate();
  return (

    <div>
      
      
    
        <div className="container">
          <TeacherHeader/>
          <TeacherSidebar/>
        
          <main>
            <Routes>
              {/* <Route path="/" element={<Header />} index /> */}
              {/* <Route path="/" element={<Sidebar />} index /> */}
              <Route path="/" element={<TeacherHome />} index />
              {/* <Route path="/teacher/marks" element={<Marks />} />
              <Route path="/teacher/attendance" element={<Attendance />} />
              <Route path="/teacher/settings" element={<Settings />} />
              <Route path="/teacher/profile" element={<Profile />} /> */}
              <Route path="/login" element={<LoginSignup />} />
            </Routes>
          </main>
        </div>
        
    </div>
  );
};

export default TeacherOutlet;
