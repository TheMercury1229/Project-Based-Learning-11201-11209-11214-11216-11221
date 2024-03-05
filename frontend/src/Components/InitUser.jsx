import { atom, useRecoilValue , useSetRecoilState } from "recoil";
import { userState } from "../store/user";
import { useEffect } from "react";
import LoginSignup from "../Pages/LoginSignup";
import Home from "../Pages/Home";
const InitUser = () => {
    console.log("in the initUser");
    const user = useRecoilValue(userState);
    const setLogin  = useSetRecoilState(userState);
    useEffect(()=>{
        console.log("useEffect in InitUser ran");
        fetch("http://localhost:3000/user/me" , 
        {
            method: "GET" , 
            headers : {
                "Content-type" : "Application/json",
                "token" : localStorage.getItem("token")
            }
        }).then((response)=>{
            response.json().then((data)=>{
                if(data.user_type){
                    //correct token user is logged in 
                    console.log("correct token");
                    localStorage.setItem("user_id" , data.user_id);
                    localStorage.setItem("user_type",data.user_type);
                    const object = {user_id : data.user_id , user_type : data.user_type, loggedIn : true};
                    localStorage.setItem("token" , data.token);
                    setLogin(object);
                   
                   
                }else{
                    const object = {user_id : 0 , user_type : "", loggedIn : false};
                    setLogin(object);
                   
                    
                }
            })
        })
    } , [])
    return (
        <> 
        { !user.loggedIn ?   <LoginSignup ></LoginSignup> : <Home/> }
        
        </>
    )
}
export default InitUser;
