import { Announcement } from "../models/announcement.model.js";

export const createAnnouncement = async (req , res)=>{
    try {
        const {title , description} = req.body
        if(!title || !description){
            return res.status(404).json({
                message: "Something is missing",
                success: false
            })
        }
        const newAnnouncement = await Announcement.create({
            title , description
        })
        return res.status(200).json({
            message: "Announcement created successfully" ,
            announcement : newAnnouncement ,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed",
            success: false
          });
    }
}


export const getAllAnnouncement = async (req , res)=>{
    try {
        const announcements = await Announcement.find()
        if(!announcements){
            return res.status(404).json({
                message : "No announcement found" ,
                success: false
            })
        }
        return res.status(200).json({
            message: "Announcements here" ,
            announcements ,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed",
            success: false
          });
    }
}