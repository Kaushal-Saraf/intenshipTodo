import { User, todoDocs } from "../models/user"
export async function updateUserTodo(userName:string, todoDetails:todoDocs[]){
    try{
        const result = await User.updateOne({name:userName},{todos:todoDetails})
        return result
    }
    catch(error){
        return ({error: error})
    }
}