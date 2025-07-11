import express from "express";
import { login, logout, register } from "../controllers/user.controller";
import { isAuthed } from "../middlewares/isAuthed";


const router = express.Router();

// Public
router.post("/register", register);
router.post("/login", login);

//  Authenticated User
router.post("/logout", isAuthed, logout);

export default router;
