import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema
(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,// cloudinary url
            required: true
        },
        coverImage: {
            type: String
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    }, 
    {
        timestamps: true
    } // isko true karne se createdAt aur updatedAt mil jaata hai
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password = bcrypt.hash(this.password, 10)
    next()
})// yaha pe context pata hona bahaut jaruri hai aur normal syntax of callback me context pata nahi hota so normal syntax use mat karna yaha pe

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

// jwt is a bearer-token : yeh token jiske pass hai uske pass data bhej deta hai backend


export const User = mongoose.model("User", userSchema)