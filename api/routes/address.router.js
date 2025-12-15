import express from "express"
import { createAddress, deleteAddress, getAllAddress, getSelectedAddresss, setAsDefault, updateAddress } from "../controllers/address.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",protect, getAllAddress);
router.post("/",protect, createAddress);
router.put("/:id",protect,updateAddress);
router.delete("/:id",protect,deleteAddress);

router.put("/default/:id",protect, setAsDefault);
router.get("/selected",protect,getSelectedAddresss)

export default router;