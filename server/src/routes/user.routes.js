import {Router} from "express"
import { loginUser, logoutUser, registerUser } from "../controller/user.controller.js"
import { loginUserValidator, userRegisterValidators } from "../validators/user.validators.js";
import { validate } from "../validators/validate.js";
import { upload } from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const router=Router()

router.route("/register").post(upload.single("avatar"),userRegisterValidators(),validate,registerUser)
router.route("/login").post(loginUserValidator(),validate,loginUser)

router.route("/logout").post(verifyJWT,logoutUser)


export default router;