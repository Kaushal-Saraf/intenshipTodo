import { Request, Response } from "express";

export async function getHome(req:Request,res:Response){
    res.json({message:"Hello"});
}