import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },
        price: {
            type : String,
            required : true,
        },
        description : {
            type : String,
        },
        category : {
            type : String,
            enum:["toys","books","laptop","mobilephones","tablets","accessories","others"],
            default:"others",
        },
        image : {
            type : String,
            
        },
        stock : {
            type : String,
            default:0,
        },
},
{
    timestamps : true
}
)

export const Product = mongoose.model("Product",productSchema)