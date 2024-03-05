import React, { useState } from "react";

const InputField = ({ type, placeholder, val, setVal }) => {
  // [val, setVal] = useState("");
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={val}
      onChange={(e) => {
        // e.preventDefault();
        setVal(e.target.value);
        // console.log(val);
      }}
      className=" bg-transparent  outline-none px-8 pl-12 py-4 rounded-[6px] text-[20px] border-gray-600  shadow-sm w-[400px] hover:border-solid  hover:border-gray-500 hover:border-[0.6px] transition-all ease-in duration-100
      max-[800px]:w-[80%] max-[800px]:mr-auto max-[800px]:block"
      autoComplete="off"
    />
  );
};

export default InputField;
