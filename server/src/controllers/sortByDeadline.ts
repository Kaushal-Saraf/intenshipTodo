import { Request,Response } from "express";
import { fetchUser } from "../services/fetchUser";
import sortArray from "../utils/sortDateandTime";

const sortByDeadline = async (req:Request,res:Response)=>{
    const result:any = await fetchUser(req.params.id);
    const sorted = sortArray(result.todos)
    res.json(sorted)
}
export{
    sortByDeadline
}