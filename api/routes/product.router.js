import express from "express";
import { createProduct, getProduct, getProductById } from "../controllers/product.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router()

router.post("/",upload.single("image"),createProduct)
router.get("/",getProduct)
router.get("/:id",getProductById)

export default router