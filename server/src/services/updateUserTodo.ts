import { User } from "../models/user"
export async function updateUserTodo(userName:string, todoDetails:any){
    try{
        const result = await User.updateOne({name:userName},{todos:todoDetails})
        return result
    }
    catch(error){
        return ({error: error})
    }
}