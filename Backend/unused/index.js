import express from "express";
import bodyParser from "body-parser";
import z from "zod";
import pg from "pg"
import bcrypt from "bcrypt"
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
// import {LocalStrategy} from "passport-local"
import cors from "cors";
const SECRET = "hi there"


const saltRounds = 10;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use(passport.initialize());
app.use(passport.session());



const db = new pg.Client({
    host : "localhost",
    user: "postgres",
    database : "PBL_student_dashboard",
    password : "11201_VivekBhalke",
    port : 5432
})


const user_zod_object = z.object({
    username : z.number(),
    password : z.string().min(8)
})


async function initUser(req , res , next){
    try {
        const user_details = req.body;
        var username = user_details.username;
        console.log(typeof username)
        console.log(username)
        try {
            username = Number(username);
        } catch (error) {
           return res.json({message : "error in zod parsing  "})
            
        }
        const object = { username : username , password : user_details.password}
        console.log(typeof user_details);
        console.log(typeof username);
        console.log(typeof user_details.password);
        const result = user_zod_object.parse(object);
            
        next();
    } catch (error) {
        return res.json({message : "error in zod "})
    }
}




db.connect();




app.get("/" , (req , res)=>{
    console.log("everything working properly")
    res.send("everything good")
})
/** the request must be a json with  */
// app.get("/secrets" , (req, res)=>{
//     if(req.isAuthenticated()){
//         res.json({message: "authenticated" , user: req.user})
//     }else{
//         res.send("you are not authenticated")
//     }
// })


app.get("/check-auth" , (req , res)=>{
    
    if(req.isAuthenticated()){
        res.send({loggedIn: true});
    }
    else{
        res.send({loggedIn:false});
    }
})
app.get("/user" , (req , res)=>{
    if(req.isAuthenticated()){
        console.log("authenticated")
        res.json({
            user_id:req.user.user_id,
            user_type:req.user.user_type
        })
    }
    else{
        res.send({error  : "there was an error"});
    }
})



app.post("/login", initUser,passport.authenticate('local' , {
    successRedirect:"/user",
    failureRedirect: "/user"
}) )


// app.get("/marks" , async (req , res)=>{
//     if(req.isAuthenticated()){
//         const user_id = req.user.user_id;
//         const subject_id = req.body.subject_id;
//         try {
//             const result = await db.query("SELECT   test_id , marks FROM marks WHERE  rollno = $1" , [req.user.user_id]);
//             res.send(result.rows)
//         } catch (error) {
//             console.log(error);
//         }
        
//     }
//     else{
//         res.json({})
//     }
// })
passport.use(new Strategy(async function  verify(username , password , cb){
    console.log(username);
    console.log(password);
//    return cb(null,{username : username , password : password , user_type : "student"})
    try {
        
        console.log("in the stratergy verify function");
        console.log("---------------------------")
        
        username = Number(username);
        console.log(typeof username);
            // console.log("in the try block of /login");
            const result = await db.query("SELECT * FROM users WHERE user_id = $1" , [username]);
            const user = result.rows[0];//it is an object now.
            // console.log(user);
            bcrypt.compare(password , user.password , (err , same)=>{
                if(err){
                    return cb(err,false)
                }
                else{
                    if(same){
                        console.log("same password")
                        console.log(typeof user.user_id)
                        return cb(null , user);
                    }
                    else{
                        console.log("password is not same")
                        return cb(null , {message : "incorrect password"})
                    }
                }
            })
        } catch (error) 
        {
            console.log("error in verify")
           return cb(error, {message : "incorrect username"});
           
        }
}))

// app.use(initUser);
passport.serializeUser((user, cb)=>{
    console.log("in the serializeUser function")
    cb(null, user)
})
passport.deserializeUser((user, cb)=>{
    console.log("in the deserializeUser function")
    cb(null , user);
})
app.listen(3000 , ()=>{
    console.log("server started on port 3000");
})























