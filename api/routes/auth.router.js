import express from "express"
import { getMyProfile, logoutController, productDisplay, productUpdate, signinController, signupController } from "../controllers/auth.controller.js"
import { onlyAdmin, onlyUser, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signupController)
router.post("/signin",signinController)

router.get("/user",protect,onlyUser,productDisplay)
router.get("/admin",protect,onlyAdmin,productUpdate)
router.get("/profile",getMyProfile)
router.get("/logout",logoutController)

export default router;