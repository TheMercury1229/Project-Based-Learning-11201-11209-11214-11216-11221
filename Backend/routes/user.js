import express from "express";
import bcrypt from "bcrypt"
const saltRounds = 10;
const router = express.Router();
import initUser from "../middleware/zod_verification.js";
import db from "../db.js";
import jwt from "jsonwebtoken"
import env from "dotenv";
import tokenVerify from "../middleware/token_verification.js";
env.config();
const SECRET = process.env.SECRETS;
router.post("/login", initUser , async ( req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

        try 
        {
            const result = await db.query("SELECT * FROM users_real WHERE user_id = $1" , [username]);
            console.log("after result")
            const user = result.rows[0];//it is an object now.
            // console.log(user);
            console.log(password);
            console.log(user.password)
            bcrypt.compare(password , user.password , (err , same)=>{
                if(err){
                    // return cb(err,false)
                    return res.json({})
                }
                else{
                    if(same){
                        console.log("same password")
                        console.log(typeof user.user_id)
                        // return cb(null , user);
                        const string = user.user_id + ',' + user.password + ',' +user.user_type;
                        const token = jwt.sign( string, SECRET);    
                        return res.json({user_id : user.user_id , user_type : user.user_type , token :token});

                    }
                    else{
                        console.log("password is not same")
                        // return cb(null , {message : "incorrect password"})
                        return res.json({})
                    }
                }
            })
        } catch (error) 
        {
           console.log("error in verify")
        //    return cb(error, {message : "incorrect username"});
           return  res.json({})
           
        }
        
})
router.get("/me" , tokenVerify, async (req , res)=>{
    console.log("/me route hitted")
    const token = req.headers.token
    try {
        const result = jwt.verify(token , SECRET);
        // return res.json({token : result});
        const array = result.split(',');
        const user_id = Number(array[0]);//put the rollno in user_id
        const user_type = array[2];
        if(user_type == 'student')
        {
            try {
                const data = await db.query("SELECT fname , email FROM students WHERE rollno=$1" , [user_id]);
                console.log(data);
                const nameAndEmail = data.rows[0];
                console.log(nameAndEmail)
                return res.json({user_id : user_id, user_type : user_type , token:token , name : nameAndEmail.fname , email : nameAndEmail.email});
                // return res.json({message : "everything went well"})
            } catch (error) {
                return res.json({message : "select query from students error"})
            }
        }else if(user_type == 'teacher')
        {
            try {
                // const data = await db.query("SELECT teacher_id , lname , teacher_mobileno FROM teachers WHERE teacher_id = $1" , [user_id]);
                const data = await db.query("SELECT teachers_real.teacher_id, teachers_real.lname, teachers_real.teacher_mobileno, teacher_subjects_real.subject_id, subjects.subject_name FROM teachers_real JOIN teacher_subjects_real ON teachers_real.teacher_id = teacher_subjects_real.teacher_id JOIN subjects ON teacher_subjects_real.subject_id = subjects.subject_id WHERE teachers_real.teacher_id = $1" , [user_id]);
                console.log(data.rows);
                let teacherData = data.rows[0];
                let subjects = [];
                for(var i = 0;i<data.rows.length;i++)
                {
                    if(data.rows[i].subject_name)
                    {
                        subjects.push(data.rows[i].subject_name)
                    }
                }
                return res.json({user_id : user_id , user_type : user_type,token:token,teacher_name : teacherData.lname, mobileno : teacherData.teacher_mobileno , teacherSubjects : subjects});
            } catch ({error}) {
                return res.json({error : "there was an error"});
            }
        }
    } catch (error) {
        return res.json({message : "incorrect token"})
    }
})

router.get("/isDefaulter" , tokenVerify ,async (req ,res)=>{
    const rollno = req.headers.user_id;
    if(!rollno)
    {
        return res.json({message : "rollno not found"});
    }
    try {
        const result = await db.query("SELECT isdefaulter FROM defaulter WHERE rollno = $1" , [rollno]);
        if(result.rows[0].isdefaulter == true ){
            //is a defaulter
            return res.json({isDefaulter:true});
           
        }else{
            return res.json({isDefaulter : false});
        }
        
    } catch (error) {
        return res.json({message : "error occured"});
    }
})
router.put("/updateDefaulter" , tokenVerify , async(req, res)=>{
    const rollno = req.headers.user_id;
    const value = req.headers.value;
    let flag = false
    if(value == "1"){
        flag = true;
    }
    else if (value == "0"){
        flag = false;
    }else{
        return res.json({message :"invalid input send 0 or 1"});
    }
    if(!rollno)
    {
        return res.json({message : "rollno not found"});
    }
    try {

        const result = await db.query("UPDATE defaulter SET isdefaulter = $1 WHERE rollno = $2" , [flag ,rollno]);
        return res.json({message : "updated successfully"});
        
    } catch (error) {
        return res.json({message : "error occured"});
    }
})
export default router;