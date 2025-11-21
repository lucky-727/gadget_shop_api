import mongoose from "mongoose"

export const db = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connection established to database")
    }catch(err){
        console.log("Error in connecting to database",err)
    }
}