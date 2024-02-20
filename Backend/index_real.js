import express from "express";
import bodyParser from "body-parser";
import z from "zod";
import pg from "pg"
import bcrypt from "bcrypt"
import cors from "cors";
const saltRounds = 10;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const router = express.Router();
import userRoutes from "./routes/user.js";
import  db  from "./db.js";
import initUser from "./middleware/zod_verification.js";

db.connect();


app.get("/" , (req , res)=>{
    console.log("everything working properly")
    res.send("everything good")
})




app.use("/user" , userRoutes);


app.listen(3000 , ()=>{
    console.log("server started on port 3000");
})


