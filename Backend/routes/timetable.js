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
          ]
          result.Saturday = saturday;
        return  res.json({timeTable : result});
    } catch (error) {
        return res.json({message : "error"});
    }
    
})