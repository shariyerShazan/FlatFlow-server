import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"

export const connectDB = async ()=>{
    try {
       const res = await mongoose.connect(process.env.MONGO_URL)
       console.log("Mongodb connected")
    } catch (error) {
        console.log(error)
    }
}