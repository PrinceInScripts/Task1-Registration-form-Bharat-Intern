import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadCloudinary } from "../utils/cloudinary.js"
import { forgotPasswordMailgenContent, sendEmail } from "../utils/mail.js";
import crypto from "crypto"

const generateAccessAndRefreshToken = async (userId) => {
    try {
      const user = await User.findById(userId);
      
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
  
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while generating the access token"
      );
    }
  };

const registerUser=asyncHandler(async (req,res)=>{
    const { username,fullName, email, password } = req.body;

   const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  const avatarLocalPath=req.file?.path;
  if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is missing")
  }

  const avatar=await uploadCloudinary(avatarLocalPath)
  if(!avatar){
    throw new ApiError(400,"Error while uploading on avatar file")
  }


  const user = await User.create({
    username,
    fullName,
    email,
    password,
    avatar:avatar?.url
  });

  
  const createUser = await User.findById(user._id).select(
    "-password"
  );

  if (!createUser) {
    throw new ApiError(500, "user not created");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createUser,
        "Users registered successfully"
      )
    );
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
  
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });
  
    if (!user) {
      throw new ApiError(401, "Invalid crdentials");
    }
  
     
    const isPasswordValid = await user.isPasswordCorrect(password);
  
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }
  
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
  
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
  
    const options = {
      httpOnly: true,
      secure: true,
      // secure: process.env.NODE_ENV === "production",
    };
  
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            loggedInUser,
            accessToken,
            refreshToken,
          },
          "User logged In Successfully"
        )
      );
  });

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      { new: true }
    );
  
    const options = {
      httpOnly: true,
      secure: true,
      // secure:process.env.NODE_ENV==='prodcution'
    };
  
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiError(200, {}, "User Logout Successfully"));
  });

  const forgotPassword = asyncHandler(async (req, res) => {
    const { email, username } = req.body;
  
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });
  
    if (!user) {
      throw new ApiError("User Does not exist");
    }
  
    const { unhashedToken, hashedToken, tokenExpiry } =
      await user.generateTemporaryToken();
  
    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordTokenExpiry = tokenExpiry;
    await user.save({ validateBeforeSave: false });
  
    const mailgenContent = await forgotPasswordMailgenContent(
      user?.username,
      `${req.protocol}://${req.get(
        "host"
      )}/api/v1/users/reset-password/${unhashedToken}`
    );
  
    await sendEmail({
      email: user?.email,
      subject: "Reset Your Password",
      mailgenContent,
    });
  
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {},
          "Password reset mail has been sent on your mail id"
        )
      );
  });
  
  const resetForgotPassword = asyncHandler(async (req, res) => {
    const { resetPasswordToken } = req.params;
    const { newPassword } = req.body;
  
    let hashedToken = crypto
      .createHash("sha256")
      .update(resetPasswordToken)
      .digest("hex");
  
    const user = await User.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
  
    if (!user) {
      throw new ApiError(401, "ResetPasswordToken is invalid or expired");
    }
  
    user.password = newPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save({ validateBeforeSave: false });
  
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password reset successfully"));
  });

    

export {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetForgotPassword,
}