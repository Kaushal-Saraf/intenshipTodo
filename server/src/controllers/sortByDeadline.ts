import { Request,Response } from "express";
import { fetchUser } from "../services/fetchUser";
import sortArray from "../utils/sortDateandTime";
import { userDocs } from "../models/user";

const sortByDeadline = async (req:Request,res:Response)=>{
    const result:userDocs = await fetchUser(req.params.id) as userDocs;
    const sorted = sortArray(result.todos)
    res.json(sorted)
}
export{
    sortByDeadline
}