import express from "express";
import { isAuthed } from "../middlewares/isAuthed.js";
import { isAdmin } from "../middlewares/role.middleware.js";
import {
  createApartment,
  deleteApartment,
  editApartment,
  getAllApartments,
  getApartmentById,
  getAvailableApartment,
} from "../controllers/apartment.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// Admin routes (create, edit, delete)
router.post(
  "/apartments",
  isAuthed,
  isAdmin,
  upload.single("image"),
  createApartment
);
router.patch(
  "/apartments/:id",
  isAuthed,
  isAdmin,
  upload.single("image"),
  editApartment
);
router.delete("/apartments/:id", isAuthed, isAdmin, deleteApartment);

// Public routes (for authenticated users)
router.get("/apartments",  getAllApartments);
router.get("/apartment/:id",  getApartmentById);


export default router;
