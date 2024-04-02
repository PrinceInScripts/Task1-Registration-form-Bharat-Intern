import {body} from "express-validator"

const userRegisterValidators=()=>{
    return [
        body("email")
                    .trim()
                    .notEmpty()
                    .withMessage("Email is required")
                    .isEmail()
                    .withMessage("Email is not valid"),
        body("fullName")
                    .trim()
                    .notEmpty()
                    .withMessage("fullName is required"),
        body("confirmPassword")
                    .trim()
                    .notEmpty()
                    .withMessage("Confirm Password is required"),
        body("password")
                    .trim()
                    .notEmpty()
                    .withMessage("Password is required")
        
    ]
}

const loginUserValidator=()=>{
    return [ 
        body("email")
                    .isEmail()
                    .withMessage("Email is not valid"),
        body("password")
                    .trim()
                    .notEmpty()
                    .withMessage("Password is required")
        
    ]
}

const userForgotPasswordValidator=()=>{
    return [
        body("email")
                   .notEmpty()
                   .withMessage("Email is required")
                   .isEmail()
                   .withMessage("Email is Invalid"),
        
    ]
}

const resetForgotPasswordValidator=()=>{
    return [
        body("newPassword")
                         .notEmpty()
                         .withMessage("Passsword is required")
    ]
}


export {
    userRegisterValidators,
    loginUserValidator,
    userForgotPasswordValidator,
    resetForgotPasswordValidator
}