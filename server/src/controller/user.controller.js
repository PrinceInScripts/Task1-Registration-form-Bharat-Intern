import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadCloudinary } from "../utils/cloudinary.js"

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


export {
    registerUser
}