import { Request,Response } from "express";
import { fetchUser } from "../services/fetchUser";

const fetchTodo=async (req:Request,res:Response)=>{
    const result = await fetchUser(req.params.id);
    res.send(result);
}
export{
    fetchTodo
}