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

async function getsubjectAttendance( rollno  , subject_name){
    return new Promise(async (resolve, reject)=>{
        try {
            const data = await db.query('SELECT * FROM attendance_real JOIN subjects ON attendance_real.subject_id = subjects.subject_id WHERE rollno = $1 AND subjects.subject_name = $2' , [rollno , subject_name])
            const subject_id = data.rows[0];
            // console.log(subject_id);
            const attended = parseInt(subject_id.attended);
            // const attended = 0;
            const conducted = parseInt(subject_id.conducted);
            // console.log(Math.ceil((attended/conducted)*100));
            // const conducted = 0;
            // console.log("hi there")
            const object = {
                attended : attended,
                conducted:conducted,
                attendance:Math.ceil((attended/conducted)*100)
            }
            resolve(object); 
        } catch (error) {
            reject(error);
        }
        
    })
}
async function getOverallTheoryAttendance(rollno){
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await db.query("SELECT * FROM attendance_real WHERE rollno = $1 AND (subject_id = 1 OR  subject_id=2 OR  subject_id = 3 OR subject_id = 4 OR subject_id = 5 )",[rollno])
            let totalDays = 0;
            let presentDays = 0;
            result.rows.forEach(element => {
                totalDays += parseInt(element.conducted);
                console.log(element.conducted);
                console.log("------------")
                console.log(element.attended);
    
                presentDays += parseInt(element.attended);
            });
            console.log("-----------");
            console.log("-----------");
            console.log("-----------");
            console.log(totalDays);
            console.log(presentDays);
            const overallAttendance = Math.ceil((presentDays/totalDays)*100);
            const object = {
                attended :  presentDays,
                conducted: totalDays,
                attendance : overallAttendance
            }
            resolve(object);
    
        } catch (error) {
            reject(error)
        }
    })
}
router.get("/getOverallTheoryAttendance",tokenVerify ,async (req,res)=>{
    const rollno = req.headers.user_id;
    if(!rollno){
        return res.json({message : "please send rollno"})
    }
    else{
        try {
            const result = await db.query("SELECT * FROM attendance_real WHERE rollno = $1 AND (subject_id = 1 OR  subject_id=2 OR  subject_id = 3 OR subject_id = 4 OR subject_id = 5 )",[rollno])
            let totalDays = 0;
            let presentDays = 0;
            result.rows.forEach(element => {
                totalDays += parseInt(element.conducted);
                console.log(element.conducted);
                console.log("------------")
                console.log(element.attended);
    
                presentDays += parseInt(element.attended);
            });
            console.log("-----------");
            console.log("-----------");
            console.log("-----------");
            console.log(totalDays);
            console.log(presentDays);
            const overallAttendance = Math.ceil((presentDays/totalDays)*100);
            return res.json({overallAttendance});
    
        } catch (error) {
            return res.json({"message" : "there was an error"})
        }
    
    }
})
async function getOverallPracticalAttendance(rollno)
{
    return new Promise(async (resolve, reject)=>{
        try {
            const result = await db.query("SELECT * FROM attendance_real WHERE rollno = $1 AND (subject_id = 13 OR subject_id = 14 OR subject_id = 10 OR subject_id = 11 OR subject_id = 12 OR subject_id = 13  OR  subject_id=9 OR  subject_id = 8 OR subject_id = 7 OR subject_id = 6 )",[rollno])
            let totalDays = 0;
            let presentDays = 0;
            result.rows.forEach(element => {
                totalDays += parseInt(element.conducted);
                presentDays += parseInt(element.attended);
            });
            const overallPracticalAttendance = Math.ceil((presentDays/totalDays)*100)
            const object = {
                attended: presentDays,
                conducted : totalDays,
                attendance : overallPracticalAttendance
            }
            resolve(object);
    
        } catch (error) {
            reject(error);
        }
    })
}
router.get("/getOverallPracticalAttendance",tokenVerify ,async (req,res)=>{
    const rollno = req.headers.user_id;
    if(!rollno){
        return res.json({message : "please send rollno"})
    }
    else{
        try {
            const result = await db.query("SELECT * FROM attendance_real WHERE rollno = $1 AND (subject_id = 13 OR subject_id = 14 OR subject_id = 10 OR subject_id = 11 OR subject_id = 12 OR subject_id = 13  OR  subject_id=9 OR  subject_id = 8 OR subject_id = 7 OR subject_id = 6 )",[rollno])
            let totalDays = 0;
            let presentDays = 0;
            result.rows.forEach(element => {
                totalDays += parseInt(element.conducted);
                presentDays += parseInt(element.attended);
            });
            const overallPracticalAttendance = Math.ceil((presentDays/totalDays)*100);

            return res.json({overallPracticalAttendance:overallPracticalAttendance})
        } catch (error) {
            reject(error);
        }
    
    }
})



router.get("/getsubjectAttendance" ,tokenVerify, async (req ,res)=>{
    const rollno = req.headers.user_id;

    const subject_name = req.headers.subject_name;
    console.log(rollno + subject_name);
    if(!rollno || !subject_name ){

        return res.json({message : "provide rollno and subject_id"})
    }else{
        try {
            const data = await db.query('SELECT * FROM attendance_real JOIN subjects ON attendance_real.subject_id = subjects.subject_id WHERE rollno = $1 AND subjects.subject_name = $2' , [rollno , subject_name])
            const subject_id = data.rows[0];
            console.log(subject_id);
            const attended = parseInt(subject_id.attended);
            // const attended = 0;
            const conducted = parseInt(subject_id.conducted);
            // const conducted = 0;
            return res.json({attendance: Math.ceil((attended/conducted)*100)});
        } catch (error) {
            return res.json({message : "error"});
        }
    }
    
});

router.get("/getAllSubjectAttendance",tokenVerify ,async (req,res)=>{
    console.log("/getAll subject route hitted")
    const rollno = req.headers.user_id;
    let result = {};
    if(!rollno){
        return res.json({message : "please send rollno"})
    }
    else{
        const EG = await getsubjectAttendance(rollno,"EG");
        const EM2 = await getsubjectAttendance(rollno,"EM2");
        const PHY = await getsubjectAttendance(rollno,"PHY");
        const EM = await getsubjectAttendance(rollno,"EM");
        const BEE = await getsubjectAttendance(rollno,"BEE");
        const CS = await getsubjectAttendance(rollno,"CS");
        const EGLab = await getsubjectAttendance(rollno,"EG-L");
        const PHYLab = await getsubjectAttendance(rollno,"PHY-L");
        const EM2Lab = await getsubjectAttendance(rollno,"EM2-L");
        const EMLab = await getsubjectAttendance(rollno,"EM-L");
        const BEELab = await getsubjectAttendance(rollno,"BEE-L");
        const CADLab = await getsubjectAttendance(rollno,"CAD-L");
        const PBLLab = await getsubjectAttendance(rollno,"PBL-L");
        /* 
            {
                attended , conducted , attendance
            }
        */
        const overallTheoryAttendance = await  getOverallTheoryAttendance(rollno) ;
        const overallPracticalAttendance = await  getOverallPracticalAttendance(rollno) ;
        result.EG = EG;
        result.EM2 = EM2;
        result.PHY = PHY;
        result.EM = EM;
        result.BEE = BEE;
        result.CS = CS;
        result.PHYLab = PHYLab;
        result.EGLab = EGLab;
        result.EM2Lab = EM2Lab;
        result.EMLab = EMLab;
        result.BEELab = BEELab;
        result.CADLab = CADLab;
        result.PBLLab = PBLLab;
    
        result.overallTheoryAttendance=overallTheoryAttendance;
        result.overallPracticalAttendance=overallPracticalAttendance;
        console.log(result)
        return res.json({data :result});
    }
});

router.post("/dataOfTeacherAttendance" , tokenVerify, async (req,res)=>{
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
                        let subjectAttendance = await getsubjectAttendance(i,subject);
                        thisOne.attendance = subjectAttendance.attendance;
                        const data = await db.query("SELECT fname FROM students WHERE  rollno = $1",[i]);
                        
                        thisOne.name = data.rows[0].fname;
                        let defaulter = await db.query("SELECT isdefaulter FROM defaulter WHERE rollno = $1",[i]);
                        let trueOrFalse = defaulter.rows[0].isdefaulter;
                        // console.log(trueOrFalse);
                        if(trueOrFalse)
                        {
                            thisOne.msg = "Defaulter"
                        }
                        else{
                            thisOne.msg = "Clear";
                        }
                        
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

router.post("/teacherMarkAttendance" , tokenVerify , async (req,res)=>{
    const students = req.body.students;
    const subject  = req.body.subject;
    if(!students  || !subject)
    {
        return res.status(400).send('Please provide all details')
    }
    let absentStudents = students.map((rollno , index)=>{
        return parseInt(rollno)
    })
    for(var i = 11201;i<=11265;i++)
    {
        if((i!=11204 && i!=11211) )
        {
           if(absentStudents.includes(i))
           {
                try {
                    const data = await db.query("SELECT subject_id FROM subjects WHERE subject_name = $1" , [subject])
                    const subject_id = data.rows[0].subject_id;
                    const result = await db.query("UPDATE attendance_real SET conducted = conducted + 1 WHERE rollno = $1 AND subject_id = $2",[i,subject_id]);
                    
                } catch (error) {
                    return res.json({message : "something went wrong"})
                }
            //absent studnet
           }
           else{
                try {
                    const data = await db.query("SELECT subject_id FROM subjects WHERE subject_name = $1" , [subject])
                    const subject_id = data.rows[0].subject_id;
                    const result = await db.query("UPDATE attendance_real SET conducted = conducted + 1 , attended = attended+1 WHERE rollno = $1 AND subject_id = $2",[i,subject_id]);
                    
                } catch (error) {
                    return res.json({message : "something went wrong"})
                }
            //present studetn
            
           }

        }
    }
    return res.json({result : "updated successfully"})
    
})
export default router;