import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const router = express.Router();
import userRoutes from "./routes/user.js";
import  db  from "./db.js";
import attendanceRoutes from "./routes/attendance.js";
import marksRouter from "./routes/marks.js";
import timeTableRouter from "./routes/timetable.js";
try {
    db.connect();
    console.log("database connected")
} catch (error) {
    console.log("error connecting to database")
}


app.get("/" , (req , res)=>{
    console.log("everything working properly")
    res.send("everything good")
})




app.use("/user" , userRoutes);
app.use("/attendance" , attendanceRoutes);
app.use("/marks" , marksRouter);
app.use("/timetable" , timeTableRouter)
app.listen(3000 , ()=>{
    console.log("server started on port 3000");
})


