import React from "react";
import Logo from "../Logo/Logo";

const Navbar = () => {
  return (
    <div className=" basis-[30%] flex flex-col items-center justify-center gap-20">
      <div className="logo">
        <Logo />
      </div>
    </div>
  );
};

export default Navbar;
