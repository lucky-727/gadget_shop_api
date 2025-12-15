import mongoose from "mongoose";

export const addressSchema = new mongoose.Schema(
    {
        house : {
            type: String,
            required : true,
        },
        streetAddress : {
            type: String,
            required : true,
        },
        city : {
            type: String,
            required : true,
        },
        state : {
            type: String,
            required : true,
        },
        country : {
            type: String,
            required : true,
        },
        pinCode : {
            type: String,
            required : true,
        },
        phoneNumber : {
            type: String,
            required : true,
        },
        label : {
            type: String,
            default: "home",
        },
        isDefault : {
            type: Boolean,
            default : false,
        },
    },
    {
    timestamps:true,
})