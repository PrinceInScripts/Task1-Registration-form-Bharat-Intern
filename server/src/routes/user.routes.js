import {Router} from "express"
import { forgotPassword, getCurrentUser, loginUser, logoutUser, registerUser, resetForgotPassword } from "../controller/user.controller.js"
import { loginUserValidator, resetForgotPasswordValidator, userForgotPasswordValidator, userRegisterValidators } from "../validators/user.validators.js";
import { validate } from "../validators/validate.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const router=Router()

router.route("/register").post(userRegisterValidators(),validate,registerUser)
router.route("/login").post(loginUserValidator(),validate,loginUser)
router.route("/forgot-password").post(userForgotPasswordValidator(),validate,forgotPassword)
router.route("/reset-password/:resetPasswordToken").post(resetForgotPasswordValidator(),validate,resetForgotPassword)

router.route("/logout").post(verifyJWT,logoutUser)
router.route("/me").post(verifyJWT,getCurrentUser)


export default router;