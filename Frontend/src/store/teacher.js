import { atom } from "recoil";

export const teacherState = atom({
    key : 'teacherState' , 
    default : {
        id : 11201 , 
        name : 'Kolhatkar',
        mobileno:1234567890,
        subjects:[]
    }
}) ;