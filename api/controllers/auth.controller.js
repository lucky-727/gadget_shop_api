import { tokengen } from "../../utils/authtoken.js";
import { comparePassword, hashedPassword } from "../../utils/hashedPassword.js";
import {Auth} from "../models/auth.schema.js";
import jwt from "jsonwebtoken"


export const signupController = async(req,res,next)=>{
    try{
        const {email,userName,password,role} = req.body;
        if (!email||!userName||!password){
            return res.status(400).json({
                message: "All feilds are required",
            })
        }
        
        const isUserExist = await Auth.findOne({email});

        if (isUserExist){
            return res.status(400).json({
                message: " email already exist"
            })
        }

        const hashed = await hashedPassword(password)

        const user = await Auth.create({
            email,
            userName,
            password: hashed,
            role,
        })

        const token = await tokengen(user._Id,user.role);

        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"none",
            secure:process.env.NODE_ENV === "production",
            maxAge: 24*60*60*1000,
        })

        return res.status(201).json({
            message:"user created successfully",
            user: user._id,
        })
    }catch(err){
        return res.status(500).json({
            message: err.message,
        })
    }
}

export const signinController = async(req,res,next) =>{
    try{
        const {email,password} = req.body;
        if(!email|| !password){
            res.status(400).json({
                message: "All fields are required"
            })
        }

        const isEmailExist = await Auth.findOne({email})

        if (!isEmailExist){
            return res.status(400).json({
                message:"Email is not Exist"
            })
        }

        const isPassword = await comparePassword(password,isEmailExist.password)

        if(!isPassword){
            return res.status(400).json({
                message:"Password is incorrect",
            }) 
        }else{
            const token = await tokengen(isEmailExist._id,isEmailExist.role);
            // console.log(isEmailExist.role)

        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"none",
            secure:process.env.NODE_ENV === "production",
            maxAge: 24*60*60*1000,
        })
            return res.status(200).json({
                message: "login Successfull",
                data: {
                    id: isEmailExist._id,
                    userName: isEmailExist.userName,
                    address: isEmailExist.addresses,
                    role: isEmailExist.role
                } 
            })
        }
    
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


export const productDisplay = async(req,res,next)=>{
    try{
        return res.status(200).json({
            message:"my product"
        })
    }catch(err){
        return res.status(500).json({
            message: err.message,
        })
    }
}

export const productUpdate = async(req,res,next)=>{
    try{
        return res.status(200).json({
            message:"product updated successfully"
        })
    }catch(err){
        return res.status(400).json({
            message:err.message
        })
    }
}

export const getMyProfile = async(req,res,next) =>{
    try{
        const token = req.cookies?.token;
      
        if(!token){
            return res.status(401).json({
                message: "No token , Unauthorised",
            })
        }
        const decoded =await jwt.verify(token,process.env.SECRET_KEY)
     
        const user = await Auth.findById(decoded.id).select("-password")
        if (!user){
            return res.status(400).json({
                message: "No user found"
            })        
        }
        console.log(user,"test")
        return res.status(200).json({
            data: user,
        })
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

export const logoutController = async(req,res,next)=>{
    try{
        res.clearCookie("token",{
            httpOnly: true,
            sameSite: "none",
            secure:process.env.NODE_ENV === "production",
        })
        return res.status(200).json({
            message:"Logout Successfully"
        })
    }catch(err){
        return res.status(500).json(
            {
                message: err.message
            }
        )
    }
}