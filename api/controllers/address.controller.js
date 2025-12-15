import { Auth } from "../models/auth.schema.js";


//create
export const createAddress = async(req,res,next)=>{
    try{
        const userId = req.user._id;
        const user = await Auth.findById(userId);

        const newAddress = {
            ...req.body,
            isDefault : user.addresses.length === 0 ? true : false,
        }
        user.addresses.push(newAddress)
        await user.save();

        return res.status(201).json({
            message:"Address aded successfully"
        })
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

//read
export const getAllAddress = async (req,res,next) =>{
    try{
        const userId = req.user._id;
        const user = await Auth.findById(userId)

        return res.status(201).json({
            addresses : user.addresses
        })
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

//update 
export const updateAddress = async(req,res,next)=>{
    try{
        const userId = req.user._id;
        const user = await Auth.findById(userId);

        user.addresses = user.addresses.map((address)=>
            address._id.toString()=== req.params.id ? { ...address.toObject(), ...req.body} : address
        )
        await user.save();

        return res.status(200).json({
            message:"updated successfully"
        })
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

//delete 
export const deleteAddress = async(req,res,next)=>{
    try{
        const userId = req.user._id;
        const user = await Auth.findById(userId);
        console.log(req.params.id,"test")

        user.addresses = user.addresses.filter((address)=>
            address._id.toString() !== req.params.id
        );

        await user.save();

        return res.status(200).json({
            message:"deleted successfully"
        })
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

//set as default
export const setAsDefault = async (req,res,next)=>{
    try{
        const userId = req.user._id;
        const user = await Auth.findById(userId);

        user.addresses.forEach((a)=>{
            a.isDefault = a._id.toString() === req.params.id;
        });
        await user.save();

        return res.status(200).json({
            message: "set as default",
        });
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}


//get selected address:
export const getSelectedAddresss = async (req,res,next) =>{
    try{
        const userId = req.user._id
        const user = await Auth.findById(userId);

        const selectedAddress = user.addresses.find((a)=> a.isDefault === true)

        return res.status(200).json({
            address: selectedAddress,
        })
    }catch(err){
        return res.status(500).jsin({
            message: err.message,
        })
    }
}