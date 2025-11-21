import jwt from "jsonwebtoken"
import { Auth } from "../models/auth.schema.js"

export const protect = async(req,res,next)=>{
    try{
        const token = req.cookies.token
        const decode = await jwt.verify(token,process.env.SECRET_KEY)
        req.user = await Auth.findById(decode.id).select("-password");
        console.log(req.user)
        next()
    }catch(err){
        return res.status(401).json({
            message:"Unauthorized",
        })
    }
}

export const onlyAdmin = async(req,res,next)=>{
    try{
         if(req.user.role==="admin"){
            next()
        }else{
            return res.status(401).json({
                message:"Access denied"
            })
        }
    }catch(err){
            return res.status(400).json({
                message:"Unauthorizedddd"
            })
        }
}

export const onlyUser = async(req,res,next)=>{
    try{
        if (req.user.role){
            next();
        }else{
            return res.status(401).json({
                message:"access denied"
            })
        }
    }catch(err){
        return res.status(400).json({
            message: "unauthorized"
        })
    }
}