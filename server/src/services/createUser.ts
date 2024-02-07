import { userDocs } from "../models/user"

export async function createUser(newUser:userDocs){
    try{
        await newUser.save()
        return ({message:'user created sucessfully'})
    }
    catch(error){
        return ({error: error})
    }
}
