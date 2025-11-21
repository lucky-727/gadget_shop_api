import { Cart } from "../models/addToCart.schema.js";
import { Product } from "../models/product.schema.js";

export const addToCart = async (req,res,next)=>{
    try{
        const userId = req.user._id;
        const {productId,quantity} = req.body;
        if (!productId || typeof quantity === "string"){
            return res.status(404).json({
                message: "productId is required and quantity must be number",
            })
        }
        const product = await Product.findById(productId);
        console.log(product)
        if(!product){
            return res.status(404).json({
                message: "product not found",
            })
        }

        // find user cart:
        let userCart = await Cart.findOne({user:userId});
        if (!userCart){
            userCart = await Cart.create({
                user: userId,
                cartItem: [
                    {
                        product: productId,
                        quantity,
                    },
                ],
                cartPrice: product.price,
            });
            return res.status(201).json({
                data: userCart,
                message: "Successfully Added"
            });
        }

        //check existing product:
        const existingProduct =  userCart.cartItem?.find(
            (item) => item.product.toString()=== productId
        );

        console.log(existingProduct, "existing product")
        
        if(existingProduct){
            existingProduct.quantity += quantity;
        }else{
            userCart.cartItem.push({
                product : productId,
                quantity,
            })
        }

        //re calculate total price:
        userCart.cartPrice = await reCalPrice(userCart.cartItem)

        await userCart.save();
        return res.status(201).json({
            data: userCart,
        })
    }catch(err){
        return res.status(500).json({
            message: err.message,
        })
    }
}

const reCalPrice = async (items) => {
    let price = 0;
    for (const item of items){
        const product = await Product.findById(item.product);
        price += product.price * item.quantity;
    }
    console.log(price,"priceee")
    return price;
}

//get cart items controller:

export const getCartItems = async (req,res,next)=>{
    try{
        const userId = req.user._id
        console.log(userId)
        const cart = await Cart.findOne({ user: userId}).populate({
            path: "cartItem",
            populate: {
                path: "product",
                model: "Product",
                }, 
        })
        .populate({
            path: "user",
            model: "Auth",
        })

        console.log(cart)
        if(!cart){
            return res.status(404).json({
                message: "Item not found",
            })
        }
        return res.status(200).json({data: cart}) 
    }catch(err){
        return res.status(500).json({
            message: err.message,
        });
    }
}