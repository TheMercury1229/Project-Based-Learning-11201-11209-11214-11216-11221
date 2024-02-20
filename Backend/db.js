
import pg from "pg"
import env from "dotenv";
env.config();
const db = new pg.Client({
    host : "localhost",
    user: "postgres",
    database : process.env.SQL_SECRET,
    password : "11201_VivekBhalke",
    port : 5432
})
export default  db; 