import React from "react";
import MyBanner from "../assets/MYBanner.png";
const Img = () => {
  return (
    
    <div className="grid place-items-center">
      <img
        src={MyBanner}
        alt="image"
        className="w-[500px] h-[500px] object-contain drop-shadow-md max-[800px]:hidden"
      />
    </div>
  );
};

export default Img;
