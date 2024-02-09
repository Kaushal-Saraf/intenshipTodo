import { Request,Response } from "express";
import { fetchUser } from "../services/fetchUser";
import { updateUserTodo } from "../services/updateUserTodo";

const deleteCompletedTodo = async (req:Request,res:Response)=>{
    const result:any = await fetchUser(req.params.id);
    const newTodos = result.todos.filter(( todo:any) => !todo.completed);
    newTodos.forEach((todo:any,index:number)=>{
        todo.id= index+1;
    })
    await updateUserTodo(result.name, newTodos);
    res.json(newTodos)
}
export{
    deleteCompletedTodo
}