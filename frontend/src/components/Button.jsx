import React from "react";

const Button = ({ onButtonClick }) => {
  // console.log("in the Button.jsx")
  return (
    <button
      className="bg-purple-400 text-white py-3 px-10 rounded-full text-[22px] font-semibold transition-shadow hover:shadow-xl cursor-pointer max-[800px]:w-[80%] max-[800px]:max-w-[400px] max-[800px]:mx-auto"
      onClick={onButtonClick}
    >
      Continue{" "}
    </button> 
  );
};

export default Button;
