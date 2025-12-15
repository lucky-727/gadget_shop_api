import express from "express";
import { onlyAdmin, protect } from "../middleware/auth.middleware.js";
import { signinController } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/login",onlyAdmin,signinController)

export default router