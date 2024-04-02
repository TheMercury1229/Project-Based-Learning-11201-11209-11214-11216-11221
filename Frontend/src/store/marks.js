import { atom } from "recoil";

export const marksState = atom({
    key : 'marksState' , 
    default :  {
        "EM": {
            "marks": "29",
            "percentage": 97
        },
        "EM2": {
            "marks": "30",
            "percentage": 100
        },
        "BEE": {
            "marks": "23",
            "percentage": 77
        },
        "PHY": {
            "marks": "30",
            "percentage": 100
        }
        }
        
    
}) ;