import express from "express";
import { isAuthed } from "../middlewares/isAuthed.js";
import { isAdmin, isMember } from "../middlewares/role.middleware.js";
import {
  createPaymentIntent,
  getAllPayment,
  getMemberPayment,
  savePaymentInfo,
} from "../controllers/payment.controller.js";

const router = express.Router();


router.post("/payment", isAuthed, isMember, createPaymentIntent);

router.post("/payment/save", isAuthed, isMember, savePaymentInfo);
router.get("/get-member-payment", isAuthed , isMember, getMemberPayment);
router.get("/all-payments", isAuthed, isAdmin , getAllPayment);

export default router;
