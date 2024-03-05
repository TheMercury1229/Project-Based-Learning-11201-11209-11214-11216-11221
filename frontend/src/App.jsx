import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./Pages/LoginSignup";
import Attendance from "./Pages/Attendance";
import Marks from "./Pages/Marks";
import Settings from "./Pages/Settings";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import InitUser from "./Components/InitUser";
import { RecoilRoot } from "recoil";
const App = () => {
  return (
    <>
      <div className="app">
        {/* Setting Up Routes */}
        <BrowserRouter>
          <RecoilRoot>
          <InitUser></InitUser>
          <Routes>
            {/* Home Routes */}
            {/* <Route path="/">
              <Route index element={<Home />} />
              <Route path="login" element={<LoginSignup />} />
            </Route> */}
            <Route path="/login" element={<LoginSignup/>}/>
            <Route path="/home" element={<Home/>}/>

            {/* User Routes */}
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/marks" element={<Marks />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          </RecoilRoot>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
