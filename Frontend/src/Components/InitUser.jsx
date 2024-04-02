import { atom, useRecoilValue , useSetRecoilState } from "recoil";
import { userState } from "../store/user";
import { useEffect } from "react";
import LoginSignup from "../Pages/LoginSignup";
import { studentState } from "../store/student";
import { teacherState } from "../store/teacher";
import StudentOutlet from "../Pages/StudentOutlet";
import TeacherOutlet from "../Pages/TeacherOutlet";
const InitUser = () => {
    //check if the user is logged in or not and 
    //if not logged in get him to the login page
    //if he/she is logged in then identify it it is a 
    // teacher or student and send the user to its respective  outlet.
    console.log("initUser rendered");

    const user = useRecoilValue(userState);

    const setLogin  = useSetRecoilState(userState);

    const setStudent = useSetRecoilState(studentState);

    const setTeacher = useSetRecoilState(teacherState);

    console.log( "user.user_id is : " + user.user_id);

    console.log("user.loggedIn is : " + user.loggedIn);

    useEffect(()=>{
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
                    //user is logged in 
                    const loggedInis = true;
                    //correct token user is logged in 
                    // console.log("correct token");
                    localStorage.setItem("user_id" , data.user_id);
                    localStorage.setItem("user_type",data.user_type);
                    const objectUser = {user_id : data.user_id , user_type : data.user_type, loggedIn : '1'};
                    if(data.name)
                    {
                        const objectStudent = {rollno : data.user_id, name : data.name , email : data.email}
                        setStudent(objectStudent);
                        
                    }
                    if(data.teacher_name)
                    {
                        const objectTeacher = {id : data.user_id, name : data.teacher_name,mobileno : data.mobileno};
                        setTeacher(objectTeacher);
                        
                    }
                    setLogin(objectUser);
                    localStorage.setItem("token" , data.token);
                    user.loggedIn === '1' ? console.log("userLogged in is true") : console.log("userLogged in false");
                    // window.location = "/" this is not the solution
                }else{
                    //user is not logged in 
                    const object = {user_id : 0 , user_type : "", loggedIn : '0'};
                    setLogin(object);
                   
                    
                }

            })
        })
    } , [])
    function renderPage(){
        if(user.loggedIn == '1')
        {
            if(user.user_type == 'student')
            {
                return <StudentOutlet/>
            }
            else if(user.user_type == 'teacher')
            {
                return <TeacherOutlet />
            }
        }
        else{
            return <LoginSignup/>
        }
    }
    return renderPage();
}
export default InitUser;
