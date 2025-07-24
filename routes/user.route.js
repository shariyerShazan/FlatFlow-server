import express from "express";
import { firebaseLogin, getAllmember, getDatas, login, logout, register, removeMember } from "../controllers/user.controller.js";
import { isAuthed } from "../middlewares/isAuthed.js";
import upload from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/role.middleware.js";


const router = express.Router();

// Public
router.post("/register", upload.single("profilePicture") , register);
router.post("/login", login);
router.post("/firebase-login", firebaseLogin);
//  Authenticated User
router.post("/logout", isAuthed, logout);



router.get("/datas", isAuthed, isAdmin, getDatas);

router.get("/get-all-members", isAuthed, isAdmin, getAllmember);
router.post("/remove-member/:memberId", isAuthed, isAdmin, removeMember);



export default router;
