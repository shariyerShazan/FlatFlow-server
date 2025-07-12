import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import { isAuthed } from "../middlewares/isAuthed.js";
import upload from "../middlewares/multer.js";


const router = express.Router();

// Public
router.post("/register", upload.single("profilePicture") , register);
router.post("/login", login);

//  Authenticated User
router.post("/logout", isAuthed, logout);

export default router;
