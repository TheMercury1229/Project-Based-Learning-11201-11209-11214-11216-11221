import React from "react";
// import Img from "../Components/Img";
import Img from "../Components/LoginComponents/Img";
import InputForm from "../Components/LoginComponents/InputForm";
import { useRecoilValue } from "recoil";
import { userState } from "../store/user";
import FotterOfLoginPage from "../Components/LoginComponents/FotterOfLoginPage";
const LoginSignup = () => {
  const user = useRecoilValue(userState);
  // console.log("in the loginSingup.jsx")
  console.log("user.loggedin in the login singup is :" + user.loggedIn);
  
  return (
    <>
      <div className="main-container w-[100vw] h-[94vh]  flex items-center justify-start gap-[100px] p-[25px] rounded-[12px] pb-[0px] max-[800px]:gap-0">
        <Img className="basis-1/2 " />
        <div className="right flex flex-col g-5 basis-1/2 max-[800px]:w-[100%] mx-auto">
          <h1 className="text-4xl font-bold mb-5">Login</h1>
          <h2 className="text-3xl  font-light text-gray-400">Welcome Back!</h2>
          <InputForm />
        </div>
      </div>
      <footer>
        < FotterOfLoginPage/>
      </footer>
    </>
  );
  
};

export default LoginSignup;
