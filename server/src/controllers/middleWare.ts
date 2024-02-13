import { NextFunction } from "express"
import { Request, Response } from "express"
import { getUser } from "../services/auth"
require('dotenv').config();
export const authMiddleWare=async (req:Request,res:Response,next:NextFunction)=>{
    const cookie= await req.cookies;
    if(cookie===undefined && req.path!='/'){
        res.json({message: "please login first"})
    }
    else{
        console.log(cookie)
        if(cookie===undefined){
            next()
        }
        else{
            const user = getUser(await req.cookies,process.env.SECRETKEY as string)
            console.log(user)
        }
    }
   
}