import express from "express";
const router = express.Router();
import initUser from "../middleware/zod_verification.js";
import tokenVerify from "../middleware/token_verification.js";
import db from "../db.js";
import jwt from "jsonwebtoken"
import env from "dotenv";
env.config();
const SECRET = process.env.SECRETS;
async function getMarksOfThisSubject(rollno , subject_name)
{
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await db.query("SELECT marks FROM marks JOIN subjects ON marks.subject_id = subjects.subject_id WHERE rollno = $1 AND subject_name = $2" , [rollno , subject_name]);
            const data = result.rows[0];
            data.percentage = Math.ceil((parseInt(data.marks)/30)*100);
            resolve(data);
        } catch (error) {
            reject("No data found")
        }   
    })
}
router.get("/getSubjectMarks" , tokenVerify , async (req,res)=>{
    const rollno = req.headers.user_id;
    const subject_name = req.headers.subject_name;
    if(!rollno || !subject_name)
    {
        return res.json({message : "please provide subject_name and rollno"});

    }
    try {
        const result = await db.query("SELECT rollno , marks.subject_id ,marks FROM marks JOIN subjects ON marks.subject_id = subjects.subject_id WHERE rollno = $1 AND subject_name = $2" , [rollno , subject_name]);
        const marks = parseInt(result.rows[0].marks);
        return res.json({marks : Math.ceil(marks)});
    } catch (error) {
        return res.json({error : error});
    }

})
router.get("/getAverageMarks" , tokenVerify , async (req,res)=>{
    const rollno = req.headers.user_id;
    if(!rollno)
    {
        return res.json({message : "please provide subject_name and rollno"});
    }
    try {
        const result = await db.query("SELECT  marks FROM marks WHERE rollno = $1 AND (subject_id = 1 OR subject_id = 2 OR subject_id = 3 OR subject_id= 4)" , [rollno]);
        // console.log(result);
        const marks = result.rows;
        console.log(marks);
        let total = 0;
        marks.forEach((object)=>{
            total += parseInt(object.marks);
        })
        let average = total/(marks.length);
        let percentage = (total/120)*100;
        return res.json({average : Math.ceil(average) , percentage : Math.ceil(percentage)});
    } catch (error) {
        return res.json({error : error});
    }

})
router.get("/getAllSubjectMarks" , tokenVerify,async  (req,res)=>{
    const rollno = req.headers.user_id;
    const EM = await getMarksOfThisSubject(rollno , 'EM');
    const EM2 = await getMarksOfThisSubject(rollno , 'EM2');
    const BEE = await getMarksOfThisSubject(rollno , 'BEE');
    const PHY = await getMarksOfThisSubject(rollno , 'PHY');
    const object = {
        EM : EM,
        EM2 : EM2,
        BEE : BEE,
        PHY : PHY
    }
    return res.json({marks : object});
})
export default router;