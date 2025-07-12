import mongoose from "mongoose";

const announcementScehma = new mongoose.Schema({
    title: {
        type : String ,
        required: true
    } ,
    description: {
        type: String ,
        required : true
    }
} , {timestamps: true})

export const Announcement = mongoose.model("Announcement" , announcementScehma)