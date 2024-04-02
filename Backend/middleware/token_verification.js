import jwt from "jsonwebtoken";

import env from "dotenv";
env.config();
const SECRET = process.env.SECRETS;

export default async function tokenVerify(req, res,next){
    const token = req.headers.token
    try {
        const result = jwt.verify(token , SECRET);
        // return res.json({token : result});
        const array = result.split(',');
        req.headers.user_id = Number(array[0]);//put the rollno in user_id
        next();
    } catch (error) {
        return res.json({message : "incorrect token"})
    }
}