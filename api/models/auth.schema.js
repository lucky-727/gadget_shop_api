import mongoose from "mongoose";
import {addressSchema} from "./address.schema.js"


const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
        },
        userName:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        addresses: [addressSchema],
        role:{
            type: String,
            enum: ["user","admin"],
            default : "user"
        }
    },
    {
        timestamps:true,
    }
)

export const Auth = mongoose.model("Auth",userSchema);
