import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler( async(req, res) => {
    // get user details from frontend(here take it from postman)
    const {fullName, email, username, password} = req.body


    // validation(sab correct format me hai ya nahi : not empty)
    // check if user already exits: username, email
    // check for images, check for avatars
    // if available upload it on cloudinary, avatar check
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response(else return error response)
} )

export {registerUser}