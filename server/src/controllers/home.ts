import { Request,Response } from "express";
import { User, userDocs } from "../models/user";
import { createUser } from "../services/createUser";
import { fetchUser } from "../services/fetchUser";
import { setUser } from "../services/auth";
require('dotenv').config();
const home= async (req:Request,res:Response)=>{
    const {name,password,usertype} = await req.body;
   
    if(usertype==="New"){
        const exists = await fetchUser(name)
        if(exists!==null){
            res.status(200)
            res.json({message:"User exists choose different username."})
        }
        else{
            const newUser= new User({
                name:name,
                password:password
            })
            await createUser(newUser)
            const token = await setUser(name, process.env.SECRETKEY as string)
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.setHeader('Access-Control-Allow-Credentials',"true");
            res.cookie("uid",token,{sameSite:"none",secure:true,path: "/"})
            res.status(200)
            res.json({message:"Sucess"})
        }
    }
    else{
        const exists:userDocs = await fetchUser(name) as userDocs
        if(exists===null){
            res.status(200)
            res.json({message:"User doesn't exists."})
        }
        else{
            if(exists.password===password){
                const token = await setUser(name, process.env.SECRETKEY as string)
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                res.setHeader('Access-Control-Allow-Credentials',"true");
                res.cookie("uid",token,{sameSite:"none",secure:true ,path: "/"})
                res.status(200)
                res.json({message:"Sucess"})
            }
            else{
                res.status(200)
                res.json({message:"Password doesn't matches."})
            }
        }
    }
}
export{
    home
}