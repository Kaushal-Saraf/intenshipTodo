import { Request,Response } from "express";
import { fetchUser } from "../services/fetchUser";
import { updateUserTodo } from "../services/updateUserTodo";

const deleteTodo = async (req:Request,res:Response)=>{
    const result:any = await fetchUser(req.params.id);
    const {deleteIds} = await req.body;
    if(deleteIds===undefined){
        res.json({message: "Not the right input."})
    }
    else{
        const newTodos = result.todos.filter(( todo:any , index:number) => !deleteIds.includes(index+1));
        newTodos.forEach((todo:any,index:number)=>{
            todo.id= index+1;
        })
        await updateUserTodo(result.name, newTodos);
        res.json(newTodos)
    }
}
export{
    deleteTodo
}