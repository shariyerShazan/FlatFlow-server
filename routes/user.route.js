import express from "express";
import { getDatas, login, logout, register } from "../controllers/user.controller.js";
import { isAuthed } from "../middlewares/isAuthed.js";
import upload from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/role.middleware.js";


const router = express.Router();

// Public
router.post("/register", upload.single("profilePicture") , register);
router.post("/login", login);

//  Authenticated User
router.post("/logout", isAuthed, logout);



router.get("/datas", isAuthed, isAdmin, getDatas);

export default router;
