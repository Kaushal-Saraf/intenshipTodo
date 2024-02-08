import { User } from "../models/user"
export async function fetchUser(userName:string){
    try{
        const result = await User.findOne({name:userName})
        return result
    }
    catch(error){
        return ({error: error})
    }
}
