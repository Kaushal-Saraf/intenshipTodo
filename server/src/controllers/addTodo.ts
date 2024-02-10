import { fetchUser } from "../services/fetchUser"
import { Request,Response } from "express";
import { updateUserTodo } from "../services/updateUserTodo";
import { todoDocs, userDocs } from "../models/user";

const addTodo= async (req:Request<{ id: string }, any, { title: string, desc: string, start: string, end: string }>,res:Response)=>{
    const result: userDocs|null = await fetchUser(req.params.id) as userDocs;
    if(result===null){
        res.json({message:"user doesn't exists"})
    }
    else{
        const {title,desc,start,end} = req.body;
        const id:number = result.todos.length+1;
        const newtodo:any = ({
            id:id,
            title: title,
            description:desc,
            completed: false,
            startdate: start,
            enddate:end
        });
        const todos:todoDocs[] = [...result.todos , newtodo]
        await updateUserTodo(result.name, todos)
        const updatedUser = await fetchUser(result.name)
        res.json(updatedUser)
    }
    
}
export {
    addTodo
}