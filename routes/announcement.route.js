import express from "express"
import { isAuthed } from "../middlewares/isAuthed.js"
import { isAdmin } from "../middlewares/role.middleware.js"
import { createAnnouncement, getAllAnnouncement } from "../controllers/announcement.controller.js"

const router = express.Router()

router.post("/create-announcement" , isAuthed , isAdmin , createAnnouncement)
router.get("/all-announcement" , isAuthed , getAllAnnouncement)


export default router 