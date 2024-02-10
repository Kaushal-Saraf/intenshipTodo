import { Request,Response } from "express";
import { User, userDocs } from "../models/user";
import { createUser } from "../services/createUser";
import { fetchUser } from "../services/fetchUser";
import { setUser } from "../services/auth";
require('dotenv').config();
const home= async (req:Request,res:Response)=>{
    const {name,password,usertype} = await req.body;
    const newUser= new User({
        name:name,
        password:password
    })
    if(usertype==="New"){
        const exists = await fetchUser(newUser.name)
        if(exists!==null){
            res.status(200)
            res.json({message:"User exists choose different username."})
        }
        else{
            await createUser(newUser)
            const token = await setUser(name, process.env.SECRETKEY as string)
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.setHeader('Access-Control-Allow-Credentials',"true");
            res.cookie("uid",newUser.name,{httpOnly:true,sameSite:"lax",secure:false,path: "/",domain: "localhost",})
            res.status(200)
            res.json({message:"Sucess"})
        }
    }
    else{
        const exists:userDocs = await fetchUser(newUser.name) as userDocs
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
                res.cookie("uid",exists.name,{httpOnly:true,sameSite:"lax",secure:false,path: "/",domain: "localhost",})
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