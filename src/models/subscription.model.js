import mongoose, { Schema } from "mongoose";
import  jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, // one who is subscribing
        ref: "User"
    },
    channel: {
        type: Schema.Types.ObjectId, // one who owns the channel
        ref: "User"
    }
}, {timestamps: true})

export const Subscription = mongoose.model("Subscription", subscriptionSchema)