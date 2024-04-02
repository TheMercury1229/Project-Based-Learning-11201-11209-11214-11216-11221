import { atom } from "recoil";

export const studentState = atom({
    key : 'studentState' , 
    default : {
        rollno : 11201 , 
        name : 'Vivek',
        email : 'abc@gmail.com',
        class : 'FE-12',
        
    }
}) ;