import React from "react";
import Img from "../components/Img";
import InputForm from "../components/InputForm";
import Footer from "../components/Footer";
import { useRecoilValue } from "recoil";
import { userState } from "../store/user";
const LoginSignup = () => {
  const user = useRecoilValue(userState);
  // console.log("in the loginSingup.jsx")
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
        <Footer />
      </footer>
    </>
  );
};

export default LoginSignup;
