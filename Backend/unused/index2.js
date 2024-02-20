import bcrypt from "bcrypt";
const saltRounds = 10;
import z from "zod";
import pg from "pg"
const db = new pg.Client({
    host : "localhost",
    user: "postgres",
    database : "PBL_student_dashboard",
    password : "11201_VivekBhalke",
    port : 5432
})
db.connect();
const password = "11201_Vivek";
const user_id = 11201;
bcrypt.hash(password, saltRounds , (err, hash)=>{
    if(err){
        console.log("there was an error")
    }
    bcrypt.compare("11201_Vivek", "$2b$10$VmOwL24U6fJgvjbArvp3sOPx2gjTTxXLeFtPaHxiFh4NtDV1Vn6B6" , (err, same)=>{
        if(same){
            console.log(true)
        }
        else{
            console.log(false)
        }
    })
})
