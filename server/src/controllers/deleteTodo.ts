import { Request,Response } from "express";
import { fetchUser } from "../services/fetchUser";
import { updateUserTodo } from "../services/updateUserTodo";
import { todoDocs, userDocs } from "../models/user";

const deleteTodo = async (req:Request,res:Response)=>{
    const result:userDocs = await fetchUser(req.params.id) as userDocs;
    const {deleteIds} = await req.body;
    if(deleteIds===undefined){
        res.json({message: "Not the right input."})
    }
    else{
        const newTodos = result.todos.filter(( todo:todoDocs , index:number) => !deleteIds.includes(index+1));
        newTodos.forEach((todo:todoDocs,index:number)=>{
            todo.id= index+1;
        })
        await updateUserTodo(result.name, newTodos);
        res.json(newTodos)
    }
}
export{
    deleteTodo
}