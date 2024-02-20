import React, { useState, useEffect } from "react";
import Home from "./Pages/Home";
import LoginSignup from "./Pages/LoginSignup";
import InitUser from "./components/InitUser"
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import LoginOrHome from "./components/LoginOrHome";
const App = () => {
  // const [loggedIn, setLoggedIn] = useState(
  //   localStorage.getItem("loggedIn") === "true"
  // );

  // const handleLogin = () => {
  //   setLoggedIn(true);
  // };
  // useEffect(() => {
  //   localStorage.setItem("loggedIn", loggedIn);
  // }, [loggedIn]);
  // console.log("in the app.jsx")
  return <>{
    // !true ? <LoginSignup onLogin={handleLogin} /> : <Home />
    <RecoilRoot>
      <Router>
      <InitUser></InitUser>
      <LoginOrHome></LoginOrHome>
      </Router>

    </RecoilRoot>
    }</>;
};
export default App;
