import { atom } from "recoil";

export const userState = atom({
    key : 'userState' , 
    default : {
        user_id : 0 , 
        user_type : '',
        loggedIn : false
    }
}) ;