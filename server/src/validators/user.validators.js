import {body} from "express-validator"

const userRegisterValidators=()=>{
    return [
        body("email")
                    .trim()
                    .notEmpty()
                    .withMessage("Email is required")
                    .isEmail()
                    .withMessage("Email is not valid"),
        body("username")
                    .trim()
                    .notEmpty()
                    .withMessage("Username is required")
                    .isLowercase()
                    .withMessage("Username must be lowercase")
                    .isLength({min:3,max:20})
                    .withMessage("Username must be between 3 and 20 characters"),
        body("fullName")
                    .trim()
                    .notEmpty()
                    .withMessage("fullName is required"),
        body("password")
                    .trim()
                    .notEmpty()
                    .withMessage("Password is required")
        
    ]
}

const loginUserValidator=()=>{
    return [ 
        body("email")
                    .optional()
                    .isEmail()
                    .withMessage("Email is not valid"),
        body("username")
                     .optional(),
        body("password")
                    .trim()
                    .notEmpty()
                    .withMessage("Password is required")
        
    ]
}

export {
    userRegisterValidators,
    loginUserValidator
}