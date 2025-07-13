
import { Coupon } from "../models/coupon.mode.js";


// Only Admin should access this
export const createCoupon = async (req, res) => {
  try {
    const { code, discountPercentage, expiresAt } = req.body;

    if (!code || !discountPercentage || !expiresAt) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const existing = await Coupon.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: "Coupon already exists", success: false });
    }

    const newCoupon = new Coupon({
      code,
      discountPercentage,
      expiresAt,
    });

    await newCoupon.save();

    res.status(201).json({ success: true, message: "Coupon created", coupon: newCoupon });
  } catch (error) {
    console.error("Create Coupon Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



export const getCouponByCode = async (req, res) => {
    try {
      const { code } = req.params;
  
      if (!code) {
        return res.status(400).json({ success: false, message: "Coupon code is required" });
      }
  
      const coupon = await Coupon.findOne({ code: code.toUpperCase() });
  
      if (!coupon) {
        return res.status(404).json({ success: false, message: "Coupon not found" });
      }
  
      if (new Date(coupon.expiresAt) < new Date()) {
        return res.status(400).json({ success: false, message: "Coupon has expired" });
      }
  
      res.status(200).json({ success: true, coupon });
    } catch (error) {
      console.error("Get Coupon Error:", error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  


  export const getAllCoupons = async (req, res) => {
    try {
      const coupons = await Coupon.find().sort({ createdAt: -1 }); 
      res.status(200).json({ success: true, coupons });
    } catch (error) {
      console.error("Get All Coupons Error:", error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  