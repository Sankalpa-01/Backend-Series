// will include express here
// req.params aur req.body(forms aur json me aa sakte hai) bahaut use karenge
// cookie parser aur cors import karna hai iske use padhn ek baar
// cors documentation padhna hai

import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.use(cookieParser())

export { app } 