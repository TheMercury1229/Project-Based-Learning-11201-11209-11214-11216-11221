import express from "express";
import bodyParser from "body-parser";
import z from "zod";
import pg from "pg"
import bcrypt from "bcrypt"
import cors from "cors";
const saltRounds = 10;
const user_zod_object = z.object({
    username : z.number(),
    password : z.string().min(8)
})
export default async function initUser(req , res , next){
    try {
        const user_details = req.body;
        var username = user_details.username;
        try {
            username = Number(username);
        } catch (error) { 
           return res.json({message : "error in zod parsing  "})
            
        }
        const object = { username : username , password : user_details.password}
        const result = user_zod_object.parse(object);
        req.body.username = username;
        next();
    } catch (error) {
        return res.json({message : "error in zod "})
    }
}