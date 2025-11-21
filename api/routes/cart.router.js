import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { addToCart, getCartItems } from "../controllers/cart.controller.js";

const router = express.Router()

router.post("/add",protect,addToCart)
router.get("/",protect,getCartItems)

export default router