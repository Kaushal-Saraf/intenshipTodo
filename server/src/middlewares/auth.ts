import { Request,Response,NextFunction } from "express";
async function restrictToLoggedinUserOnly(req:Request,res:Response,next:NextFunction){
    const userName:string = req.cookies.uid;
    next();
}