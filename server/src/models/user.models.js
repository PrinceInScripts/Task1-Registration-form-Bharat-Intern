import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { USER_TEMPORARY_TOKEN_EXPIRY } from "../constant.js";

const userSchema = new Schema({
           username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            index:true,
           },
           password:{
            type:String,
            required:true,
           },
           email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true,
           },
           avatar:{
            type:String,
           },
           fullName:{
            type:String,
            required:true
           },
           
           refreshToken:{
            type:String
           },
           forgotPasswordToken:{
            type:String,
           },
           forgotPasswordTokenExpiry:{
            type:Date,
           }
           
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function (){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            role:this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken=function (){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.generateTemporaryToken=function(){
    const unhashedToken=crypto.randomBytes(20).toString("hex")

    const hashedToken=crypto.createHash("sha256").update(unhashedToken).digest("hex")

    const tokenExpiry=Date.now()+USER_TEMPORARY_TOKEN_EXPIRY

    return {unhashedToken,hashedToken,tokenExpiry}
}


export const User=mongoose.model("User",userSchema)