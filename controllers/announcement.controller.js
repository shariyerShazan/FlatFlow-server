import { Announcement } from "../models/announcement.model.js";

export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json({ announcements, success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch announcements", success: false });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newAnnouncement = await Announcement.create({
      title,
      description,
      createdBy: req.userId,
    });
    res.status(201).json({ message: "Announcement created", success: true, announcement: newAnnouncement });
  } catch (error) {
    res.status(500).json({ message: "Failed to create announcement", success: false });
  }
};
