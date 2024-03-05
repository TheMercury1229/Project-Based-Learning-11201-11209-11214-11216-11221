import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import "./Css/Home.css";
import Hero from "../Components/Hero.jsx/Hero";
import Heading from "../Components/Heading/Heading";
import Table from "../Components/Table/Table";
function Home() {
  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="container">
          <Navbar />
          <Hero />
          <div className="time-table">
            <Heading text="Time Table" />
            <Table />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
