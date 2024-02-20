import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { userState } from "../store/user";
const Home = () => {
  const user = {
    user_id : localStorage.getItem("user_id"),
    user_type: localStorage.getItem("user_type")
  };
  
  
  return (
    <div className="main-container flex  items-center justify-between ">
      <Navbar className="basis-1/3 " />
      <div className="home basis-2/3">Home</div>
    </div>
  );
};

export default Home;
