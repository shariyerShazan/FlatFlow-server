import express from "express";
import { isAuthed } from "../middlewares/isAuthed.js";
import { isAdmin } from "../middlewares/role.middleware.js";
import { createCoupon, getAllCoupons, getCouponByCode } from "../controllers/coupon.controller.js";

const router = express.Router();

router.post("/create", isAuthed, isAdmin, createCoupon);
router.get("/:code", getCouponByCode);
router.get("/", isAuthed , isAdmin, getAllCoupons);

export default router;
