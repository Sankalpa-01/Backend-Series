import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"

const registerUser = asyncHandler( async(req, res) => {
    // get user details from frontend(here take it from postman)
    const {fullName, email, username, password} = req.body
    console.log("email: ", email);

    // validation(sab correct format me hai ya nahi : not empty)
    // check if user already exits: username, email
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All field are required!")
    }

    const existedUser = User.findOne({
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
    


    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response(else return error response)
} )

export {registerUser}