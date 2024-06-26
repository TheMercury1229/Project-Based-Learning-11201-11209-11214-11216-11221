import express from "express";
import bcrypt from "bcrypt"
const saltRounds = 10;
const router = express.Router();
import initUser from "../middleware/zod_verification.js";
import tokenVerify from "../middleware/token_verification.js";
import db from "../db.js";
import jwt from "jsonwebtoken"
import env from "dotenv";
env.config();
const SECRET = process.env.SECRETS;
export default router;

async function getTimeTableOfThisDay(day)
{
    return new Promise(async (resolve,reject)=>{
        if(day)
        {
            console.log(day);
            let result =await  db.query(`SELECT time_slot,subject_name,torl,room_no FROM ${day}` );
            const data = result.rows;
            const newData = data.map((timeTable)=>{
                return {
                    time:timeTable.time_slot,
                    roomNumber : timeTable.room_no,
                    subject:timeTable.subject_name,
                    type : timeTable.torl === 'T' ?  'Lecture' : (timeTable.torl === 'L' ? 'Practical' : null)
                    
                }
            })
            
            resolve(newData);
        }else{
            reject("provide a day")
        }
    })
}
router.get("/getTimeTable" , tokenVerify ,async (req,res)=>{
    try {
        let result = {}
        const monday = await getTimeTableOfThisDay("monday");
        const tuesday = await getTimeTableOfThisDay("tuesday");
        const wednesday = await getTimeTableOfThisDay("wednesday");
        const thursday = await getTimeTableOfThisDay("thrusday");
        const friday = await getTimeTableOfThisDay("friday");
        result.Monday = monday
        result.Tuesday = tuesday;
        result.Wednesday = wednesday;
        result.Thursday = thursday;
        result.Friday = friday;
        let saturday = [
            {
              time: "8-10",
              roomNumber: "f-304",
              subject: "PBL-L",
              type: "LAB",
            },
            {
              time: "10.15-12 AM",
              roomNumber: "A1-111",
              subject: "CS",
              type: "Lecture",
            },
            {
              time: "01-02 PM",
              roomNumber: "A1-111",
              subject: "ES",
              type: "Lecture",
            },
          ]
          result.Saturday = saturday;
          result.Sunday = [{
            time: "",
            roomNumber:"No class on Sunday.",
            subject: ""
          }] 
        return  res.json({timeTable : result});
    } catch (error) {
        return res.json({message : "error"});
    }
    
})