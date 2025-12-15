import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { addToCart, deleteCartItem, emptyCart, getCartItems, updateCartItem } from "../controllers/cart.controller.js";

const router = express.Router()

router.post("/add",protect,addToCart)
router.get("/",protect,getCartItems)
router.put("/update",protect,updateCartItem)
router.delete("/delete/:productId",protect,deleteCartItem)

//empty:
router.delete("/empty",protect,emptyCart)
export default router