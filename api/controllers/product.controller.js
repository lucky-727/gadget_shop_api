import { Product } from "../models/product.schema.js";

export const createProduct = async(req,res,next)=>{
    try{
        const {name,price,description,category,stock}=req.body;
        if(!name||!price){
            return res.status(400).json({
                message : "All fields are required",
            })
        }

        console.log(req.file)

        //image

        const product = new Product ({
            name,
            price,
            description,
            category,
            stock,
            image: req.file.path
        })

        await product.save();

        return res.status(201).json({
            message: "Product Created Successfully",
            product: product._id,
        })

    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}


export const getProduct = async(req,res,next) => {
    try{
        const products = await Product.find({})
        if (products==0){
            return res.status(400).json({
                message: "Empty"
            })
        }
        return res.status(201).json({
            data: products,
            message:"products retreived" 
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

//get specific product:
export const getProductById = async (req,res,next) =>{
    try{
        
        const id = req.params.id
        if(!id){
            return res.status(400).json({
                message: "Product detail is unavailable"
            })
        }

        const product = await Product.findById({ _id:id})
        if(!product){
            return res.status(400).json({
                message: "Product is not Available"
            })
        }
        return res.status(200).json({
            data:product,
        })

    }catch(err){
        return res.status(500).json({
            message:err.message,
        })
    }
}

