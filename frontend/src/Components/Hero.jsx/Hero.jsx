import React from "react";
import Heading from "../Heading/Heading";
import Card from "../Card/Card";
import "./Hero.css";
const Hero = () => {
  return (
    <section className="hero">
      <Heading text="Academic Overview" />
      <div className="card-container">
        <Card
          heading={`Overall Attendance`}
          chartValue={80}
          link={`View Attendance`}
        />
        <Card heading={"Average Marks"} chartValue={76} link={`View Grades`} />
      </div>
    </section>
  );
};

export default Hero;
