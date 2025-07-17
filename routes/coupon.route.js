import express from "express";
import { isAuthed } from "../middlewares/isAuthed.js";
import { isAdmin } from "../middlewares/role.middleware.js";
import { createCoupon, getAllCoupons, getCouponByCode, updateCouponAvailability } from "../controllers/coupon.controller.js";

const router = express.Router();

router.post("/create", isAuthed, isAdmin, createCoupon);
router.get("/:code", getCouponByCode);
router.get("/", isAuthed ,  getAllCoupons);
router.patch("/availability/:couponId", isAuthed, isAdmin, updateCouponAvailability);

export default router;
