import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitUser from "./Components/InitUser";
import { RecoilRoot } from "recoil";
import  { useContext } from "react";


import { DarkModeContext } from "./Context/darkModeContext";

const App = () => {
  // console.log("App jsx rendered")
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
      <RecoilRoot>
      <InitUser></InitUser>
      </RecoilRoot>
      </BrowserRouter>
    </div>
  );
};

export default App;
