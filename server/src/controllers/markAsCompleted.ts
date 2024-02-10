import { Request,Response } from "express";
import { fetchUser } from "../services/fetchUser";
import { updateUserTodo } from "../services/updateUserTodo";
import { userDocs } from "../models/user";

const markAsCompleted = async (req:Request,res:Response)=>{
    const result:userDocs = await fetchUser(req.params.id) as userDocs;
    const {completeIds} = await req.body;
    if(completeIds===undefined){
        res.json({message: "Not the right input."})
    }
    else{
        for(let i=0;i<completeIds.length;i++){
            result.todos[completeIds[i]-1].completed = true ;
        }
        await updateUserTodo(result.name, result.todos);
        res.json(result)
    }
}
export{
    markAsCompleted
}