import LoginSignup from "../Pages/LoginSignup";
import Home from "../Pages/Home";
import { userState } from "../store/user";
import { useRecoilValue } from "recoil";
const LoginOrHome = () =>{
    const user = useRecoilValue(userState)
    
}

export default LoginOrHome;