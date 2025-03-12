import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import bcrypt from "bcrypt"

const registerUser = asyncHandler( async(req, res) => {
    // get user details from frontend(here take it from postman)
    const {fullName, email, username, password} = req.body
    console.log("email: ", email); // for debugging

    // validation(sab correct format me hai ya nahi : not empty)
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All field are required!")
    }


    // check if user already exits: username, email
    const existedUser = await User.findOne({
        $or : [{username}, {email}]
    })
    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }
    

    // check for images, check for avatars
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required!")
    }


    // if available upload it on cloudinary, avatar check
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required!")
    }


    // create user object - create entry in db
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password : hashedPassword,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser)
    {
        throw new ApiError(500, "Something went wrong while registration of user")
    }


    // remove password and refresh token field from response
    // check for user creation
    // return response(else return error response)
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully!")
    );

})

export {registerUser}