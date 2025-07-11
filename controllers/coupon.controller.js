import { Coupon } from "../models/coupon.model.js";

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json({ coupons, success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to get coupons", success: false });
  }
};

export const addCoupon = async (req, res) => {
  try {
    const { code, discountPercentage, description } = req.body;

    const existing = await Coupon.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: "Coupon code already exists", success: false });
    }

    const newCoupon = await Coupon.create({
      code,
      discountPercentage,
      description,
      isActive: true,
    });

    res.status(201).json({ message: "Coupon added", success: true, coupon: newCoupon });
  } catch (error) {
    res.status(500).json({ message: "Failed to add coupon", success: false });
  }
};

export const updateCouponStatus = async (req, res) => {
  try {
    const { couponId } = req.params;
    const { isActive } = req.body;

    const coupon = await Coupon.findByIdAndUpdate(couponId, { isActive }, { new: true });
    if (!coupon) return res.status(404).json({ message: "Coupon not found", success: false });

    res.status(200).json({ message: "Coupon status updated", success: true, coupon });
  } catch (error) {
    res.status(500).json({ message: "Failed to update coupon", success: false });
  }
};
