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
router.post("/dataOfTeacherMarks" , tokenVerify, async (req,res)=>{
    const teacher_id = req.headers.user_id;
    const subjects = req.body.subjects;
    
    if(teacher_id || subjects){
        let array = [];
        for(var j = 0 ;j < subjects.length;j++)
        {
            let subject = subjects[j];
            let object = [];
            for(var i = 11201;i<=11265;i++)
            {
                let thisOne = {};
                if(i!=11204 && i!=11211)
                {
                try {
                        thisOne.id = i;
                       
                        const data = await db.query("SELECT fname FROM students WHERE  rollno = $1",[i]);
                        
                        thisOne.name = data.rows[0].fname;
                        thisOne.marks = 25;
                       
                } catch (error) {
                        return res.json({message : error})
                }

                object.push(thisOne);
                }
            }
            array.push(object);
        }
        return res.json({data:array});
    }else{
        return res.json({message : "please give all credentials"})
    }

})

router.post("/updateMarks" , tokenVerify , async ( req ,res )=>{
    const subject = req.headers.subject;
    const array = req.body.array;
    if(subject && array.length > 0 ){
        try {
            const data = await db.query("SELECT subject_id FROM subjects WHERE subject_name = $1" , [subject])
            const subject_id = data.rows[0].subject_id;
            for(var i = 0 ; i < array.length;i++)
            {
                const object = array[i];
                const rollno = object.id;
                const marks = object.marks;
                try {
                    const result = await db.query("UPDATE marks SET marks = $1 WHERE rollno = $2 and subject_id = $3",[marks,rollno , subject_id]);

                } catch (error) {
                    return res.json({message : "something went wrong in the loop"})
                }
            }
            return res.json({result : "updated successfully "})
        } catch (error) {
            return res.json({message : "something went wrong"})
        }

    }else{
        return res.json({message : "please provide all credentials"})
    }
       
})
export default router;