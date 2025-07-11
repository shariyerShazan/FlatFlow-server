import dotenv from "dotenv"
dotenv.config()
import express from "express"
const app = express()
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDB } from "./utils/db.js"
import userRoutes from "./routes/user.route.js"

 
connectDB
// middlewares
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
  }))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// all api
app.get("/" , (req , res)=>{
    res.status(200).json({
        message: "server home page running",
        success: true
    })
}) 
app.use("/api/user", userRoutes);



// server
const PORT = process.env.PORT || 4008
app.listen(PORT , ()=>{
    console.log(`Your server is running at http://localhost:${PORT}`)
})