import { fetchUser } from "../services/fetchUser"
import { Request,Response } from "express";
import { updateUserTodo } from "../services/updateUserTodo";

const addTodo= async (req:Request,res:Response)=>{
    const result:any = await fetchUser(req.params.id);
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
        const todos = [...result.todos , newtodo]
        await updateUserTodo(result.name, todos)
        const updatedUser = await fetchUser(result.name)
        res.json(updatedUser)
    }
    
}
export {
    addTodo
}