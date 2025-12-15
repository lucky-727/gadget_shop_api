import express from "express"
import {protect} from "../middleware/auth.middleware.js";
import {
    createRazorpayOrder,
    verifyRazorpayPayment,
} from "../controllers/payment.controller.js"
import { createOrder, getUserOrders } from "../controllers/order.controller.js";

const router = express.Router();

// payment:
router.post("/create-payment",protect,createRazorpayOrder);
router.post("/verify-payment",protect,verifyRazorpayPayment)

//orders:
router.post("/create",protect,createOrder)
router.get("/user-orders",protect,getUserOrders)

export default router;