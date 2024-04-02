import {atom} from "recoil"
export const attendanceState = atom({
    key : 'attendanceState',
    default:{
        EG: { attended: 7, conducted: 8, attendance: 88 },
        EM2: { attended: 13, conducted: 15, attendance: 87 },
        PHY: { attended: 11, conducted: 14, attendance: 79 },
        EM: { attended: 11, conducted: 13, attendance: 85 },
        BEE: { attended: 8, conducted: 11, attendance: 73 },
        CS: { attended: 4, conducted: 6, attendance: 67 },
        PHYLab: { attended: 3, conducted: 3, attendance: 100 },
        EGLab: { attended: 3, conducted: 3, attendance: 100 },
        EM2Lab: { attended: 1, conducted: 2, attendance: 50 },
        EMLab: { attended: 3, conducted: 4, attendance: 75 },
        BEELab: { attended: 3, conducted: 3, attendance: 100 },
        CADLab: { attended: 1, conducted: 2, attendance: 50 },
        PBLLab: { attended: 6, conducted: 8, attendance: 75 },
        overallTheoryAttendance: { attended: 50, conducted: 61, attendance: 82 },
        overallPracticalAttendance: { attended: 30, conducted: 39, attendance: 77 }
    }

})