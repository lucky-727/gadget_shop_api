import bcrypt from "bcrypt";

export const hashedPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(String(password),salt)
    return hashed
}

export const comparePassword = async(password,registeredPassword)=>{
    return bcrypt.compare(password,registeredPassword)
}