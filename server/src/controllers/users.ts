import { Request,Response } from "express";
import { User, userDocs } from "../models/user";
import { createUser } from "../services/createUser";
import { fetchUser } from "../services/findUser";
const home= async (req:Request,res:Response)=>{
    const {name,password,usertype} = await req.body;
    const newUser= new User({
        name:name,
        password:password
    })
    if(usertype==="New"){
        const exists = await fetchUser(newUser.name)
        if(exists!==null){
            res.status(403)
            res.json({message:"User exists choose different username."})
        }
        else{
            await createUser(newUser)
            res.status(200)
            res.json({message:"Sucess"}) 
        }
    }
    else{
        const exists:any = await fetchUser(newUser.name)
        if(exists===null){
            res.status(403)
            res.json({message:"User doesn't exists."})
        }
        else{
            if(exists.password===password){
                res.status(200)
                res.json({message:"Sucess"})
            }
            else{
                res.status(403)
                res.json({message:"Password doesn't matches."})
            }
        }
    }
}
export{
    home
}