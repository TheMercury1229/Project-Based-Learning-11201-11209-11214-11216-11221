import express from "express";
import bcrypt from "bcrypt"
const saltRounds = 10;
const router = express.Router();
import initUser from "../middleware/zod_verification.js";
import db from "../db.js";
import jwt from "jsonwebtoken"
import env from "dotenv";
env.config();
const SECRET = process.env.SECRETS;
router.post("/login", initUser , async ( req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

        try 
        {
            const result = await db.query("SELECT * FROM users WHERE user_id = $1" , [username]);
            console.log("after result")
            const user = result.rows[0];//it is an object now.
            // console.log(user);
            console.log(password);
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
router.get("/me" ,async (req , res)=>{
    const token = req.headers.token;
    console.log("this is the token :" , token);
    
    if(!token){
        return res.json({message : "wrong token"});
    }
    else{
        jwt.verify( token , SECRET , async (err , string)=>{
            
           if(err){
            return res.json({message : "wrong token"});
           }
           else{
            try {
                const result = string.split(",");
                //0 : user_id , 1 : password , 2 : user_type ,
                // console.log(result);
                const username = result[0];
                const user_type = result[2];
                const password = result[1];
                console.log("username is : "+username);
                console.log("password is : " +password);
                try {
                    const returnedResult = await db.query("SELECT user_id , password FROM users WHERE user_id = $1 AND password = $2" , [username , password]);
                    const user = returnedResult.rows[0];
                    console.log(user);
                    return res.json({user_id : user.user_id , user_type : user_type, token : token});
                } catch (error) {
                    return res.json({message : "wrong token"}); 
                }
                }catch (error) {
                    return res.json({message : "wrong token"});
                }
            } 
       
           
        })
   
    }
})
export default router;