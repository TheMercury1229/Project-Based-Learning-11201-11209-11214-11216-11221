import { atom } from "recoil";

export const timeTableStudentState = atom({
    key : 'timeTableStudentState' , 
    default :{
        Sunday: [
          {
            time: "Sunday",
            roomNumber: "Holiday",
            subject: "No class Available",
            type: "",
          },
        ],
        Monday: [
          {
            time: "09-10 AM",
            roomNumber: "A-111",
            subject: "BEE",
            type: "Lecture",
          },
          {
            time: "10-12 AM",
            roomNumber: "F-502",
            subject: "Physics",
            type: "Tutorial",
          },
          {
            time: "01-02 PM",
            roomNumber: "A-111",
            subject: "Mechanics",
            type: "Lecture",
          },
        ],
        Tuesday: [
          {
            time: "08-09 AM",
            roomNumber: "F-402",
            subject: "ES",
            type: "Lecture",
          },
          {
            time: "09-10 AM",
            roomNumber: "F-402",
            subject: "BEE",
            type: "Lecture",
          },
          {
            time: "10-11 PM",
            roomNumber: "F-402",
            subject: "EM-2",
            type: "Lecture",
          },
          {
            time: "11-12 PM",
            roomNumber: "38-718",
            subject: "Mechanics",
            type: "Lecture",
          },
        ],
        Wednesday: [
          {
            time: "10-11 AM",
            roomNumber: "F-305",
            subject: "Physics",
            type: "Lecture",
          },
          {
            time: "11-12 AM",
            roomNumber: "F-205",
            subject: "Graphics",
            type: "Lecture",
          },
        ],
        Thursday: [
          {
            time: "11-12 AM",
            roomNumber: "F-406",
            subject: "EM-2",
            type: "Lecture",
          },
          {
            time: "01-03 PM",
            roomNumber: "A-111",
            subject: "CS",
            type: "Lecture",
          },
          {
            time: "02-03 PM",
            roomNumber: "38-718",
            subject: "NS200",
            type: "Lecture",
          },
        ],
        Friday: [
          {
            time: "10-11 AM",
            roomNumber: "33-309",
            subject: "MEC103",
            type: "Lecture",
          },
          {
            time: "11-12 AM",
            roomNumber: "33-309",
            subject: "MEC103",
            type: "Lecture",
          },
          {
            time: "02-03 PM",
            roomNumber: "33-601",
            subject: "CS849",
            type: "Tutorial",
          },
        ],
        Saturday: [
          {
            time: "09-10 AM",
            roomNumber: "34-604",
            subject: "DBMS130",
            type: "Tutorial",
          },
          {
            time: "10-11 AM",
            roomNumber: "34-604",
            subject: "DBMS130",
            type: "Lecture",
          },
          {
            time: "01-02 PM",
            roomNumber: "33-309",
            subject: "MTH166",
            type: "Lecture",
          },
        ],
      }
}) ;