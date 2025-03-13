// require('dotenv').config({path: './env'})
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db/index.js" ;
import {app} from './app.js';

dotenv.config({
    path: './.env'
})

// ese hum error ko nikal sakte hai
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    }) // port nahi mil raha hai toh 8000 use karlo ya server wala bhi use kar sakte ho
})
.catch((err) => {
    console.log("MONGO db connection failed !!!", err);
    process.exit(1);
})

/*
import express from "express"
const app = express()
;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/