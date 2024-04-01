import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadCloudinary } from "../utils/cloudinary.js"

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


export {
    registerUser,
    loginUser
}