
import pg from "pg"
import env from "dotenv";
env.config();
const db = new pg.Client({
    host : "localhost",
    user: process.env.SQL_USER,
    database : process.env.SQL_SECRET,
    password : process.env.SQL_PASSWORD,
    port : 5432
})
export default  db; 