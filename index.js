import dotenv from "dotenv"
dotenv.config()
import express from "express"
const app = express()
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route.js"
import apartmentRoutes from "./routes/apartment.route.js"
import { connectDB } from "./utils/db.js"
import agreementRoutes from "./routes/agreement.route.js"
 import announcementRoutes from "./routes/announcement.route.js"

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
app.use("/api/users", userRoutes);
app.use("/api/apartments" , apartmentRoutes)
app.use("/api/agreements" , agreementRoutes)
app.use("/api/announcements" , announcementRoutes)


// server and database
const PORT = process.env.PORT || 8000

const runServer = async ()=>{
    try {
       await connectDB()
         app.listen(PORT , ()=>{
            console.log(`your server is runnig at http://localhost:${PORT}`) 
        })
    } catch (error) {
        console.log(error)
    }
}
runServer()  