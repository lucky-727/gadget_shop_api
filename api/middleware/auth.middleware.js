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

// export const protect = async (req, res, next) => {
//   try {
//     let token;

//     // 1. GET TOKEN (cookie or header)
//     if (req.cookies?.token) {
//       token = req.cookies.token;
//     } else if (req.headers.authorization?.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     // 2. VERIFY TOKEN
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     // 3. FIND USER  
//     const user = await Auth.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(401).json({ message: "User not found or deleted" });
//     }

//     // 4. ATTACH USER TO REQ
//     req.user = user;

//     next();

//   } catch (err) {
//     console.log("AUTH ERROR:", err);

//     return res.status(401).json({
//       message: "Invalid or expired token",
//     });
//   }
// };

export const onlyAdmin = async(req,res,next)=>{
    try{
         if(req.body.role==="admin"){
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