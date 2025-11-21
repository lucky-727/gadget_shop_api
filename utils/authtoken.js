import jwt from "jsonwebtoken"

export const tokengen = async(id,role)=>{
    return await jwt.sign({id : id, role : role},process.env.SECRET_KEY, {expiresIn:"1d"})
}