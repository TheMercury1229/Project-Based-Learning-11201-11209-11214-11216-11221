// Module Imports
import React, { useState } from "react";
// Custom Css
import "./InputForm.css";
// Components
import InputField from "./InputField";
import { FaUser, FaLock } from "react-icons/fa6";

import Button from "./Button/Button";
import ErrorMsg from "./ErrorMsg";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/user";
const InputForm = () => {
 
  const setLogin = useSetRecoilState(userState);
  const [userValue, setUserValue] = useState("");
  const [passValue, setPassValue] = useState("");

  const [userErrMsg, setUserErrMsg] = useState(false);
  const [passErrMsg, setPassErrMsg] = useState(false);

  const handleInputChangeUser = (newValue) => {
    setUserValue(newValue);
  };
  const handleInputChangePass = (newValue) => {
    setPassValue(newValue);
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (userValue.length == 0) {
      setUserErrMsg(true);
    } else {
      setUserErrMsg(false);
    }
    if (passValue.length == 0) {
      setPassErrMsg(true);
    } else {
      setPassErrMsg(false);
    }
    // console.log(userErrMsg);
    async function getResponse(){
      fetch("http://localhost:3000/user/login" , 
      { 
          method : "POST" , 
          headers : {
          'Content-type' : "Application/json" ,
          }, 
          body: JSON.stringify(
              {
                  username : userValue , password : passValue
              })
      }).then((response)=>{
          response.json().then((data)=>{
              console.log("in the response .json.then");
              console.log(data);
              if(data.user_type){
                  console.log(data.user_type)
                  // localStorage.setItem("loggedIn",true);
                  localStorage.setItem("user_id" , data.user_id);
                  localStorage.setItem("user_type",data.user_type);
                  console.log("setLoggedIn to true here")
                  const object = {user_id : data.user_id , user_type : data.user_type, loggedIn : true};
                  localStorage.setItem("token" , data.token);
                  setLogin(object);
              }else{
                  // alert("wrong credentials");
                  setUserErrMsg(true);
                  setPassErrMsg(true);
                  const object = {user_id : 0 , user_type : '', loggedIn : false};
                  setLogin(object);
              }
          })
      })
  } 
  getResponse();
    // onLogin();
    // setUserValue("");
    // setPassValue("");
  };
  return (
    <>
      <form className="form grid gap-6  my-10">
        <div className="form-wrapper relative">
          <FaUser className="absolute top-4 left-2 react-icons " />
          <InputField
            type={"text"}
            placeholder={"Username"}
            val={userValue}
            setVal={handleInputChangeUser}
          />
          <ErrorMsg show={userErrMsg} msgName={"Username"} />
        </div>
        <div className="form-wrapper relative">
          <FaLock className="absolute top-4 left-2 react-icons " />
          <InputField
            type={"password"}
            placeholder={"Password"}
            val={passValue}
            setVal={handleInputChangePass}
          />
          <ErrorMsg show={passErrMsg} msgName={"Password"} />
        </div>
        <div className="forget-link  w-[400px] flex justify-between align-center max-[800px]:flex-col max-[800px]:gap-4 max-[800px]:items-start">
          <div className="flex items-center justify-center gap-3">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className=" accent-purple-500 w-4 h-4 rounded-[4px]"
            />
            <label htmlFor="remember" className="hover:text-purple-500">
              Remember me
            </label>
          </div>
          <a href="/passReset" className="align-middle hover:text-purple-500">
            Forgot Password?
          </a>
        </div>
        <div className="button-wrapper mr-auto max-[800px]:mr-0 w-full">
          <Button
            className="block mx-auto max-[800px]:w-[80%] max-[800px]:mr-auto"
            user={userValue}
            text={"Continue"}
            pass={passValue}
            onButtonClick={handleSubmitClick}
          />
        </div>
      </form>
    </>
  );
};

export default InputForm;
