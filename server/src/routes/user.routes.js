import {Router} from "express"
import { forgotPassword, loginUser, logoutUser, registerUser, resetForgotPassword } from "../controller/user.controller.js"
import { loginUserValidator, resetForgotPasswordValidator, userForgotPasswordValidator, userRegisterValidators } from "../validators/user.validators.js";
import { validate } from "../validators/validate.js";
import { upload } from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const router=Router()

router.route("/register").post(upload.single("avatar"),userRegisterValidators(),validate,registerUser)
router.route("/login").post(loginUserValidator(),validate,loginUser)
router.route("/forgot-password").post(userForgotPasswordValidator(),validate,forgotPassword)
router.route("/reset-password/:resetPasswordToken").post(resetForgotPasswordValidator(),validate,resetForgotPassword)

router.route("/logout").post(verifyJWT,logoutUser)


export default router;