import React from "react";

const ErrorMsg = ({ msgName, show }) => {
  return (
    <div
      className={`mt-4 ${
        show ? "" : "hidden"
      } text-red-400 text-[16px] font-bold`}
    >
      {msgName} must be filled out
    </div>
  );
};

export default ErrorMsg;
