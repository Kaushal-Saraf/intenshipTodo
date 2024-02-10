import { Request,Response } from "express";
import { fetchUser } from "../services/fetchUser";
import { updateUserTodo } from "../services/updateUserTodo";
import { todoDocs, userDocs } from "../models/user";

const deleteCompletedTodo = async (req:Request,res:Response)=>{
    const result:userDocs = await fetchUser(req.params.id) as userDocs;
    const newTodos = result.todos.filter(( todo:todoDocs) => !todo.completed);
    newTodos.forEach((todo:todoDocs,index:number)=>{
        todo.id= index+1;
    })
    await updateUserTodo(result.name, newTodos);
    res.json(newTodos)
}
export{
    deleteCompletedTodo
}