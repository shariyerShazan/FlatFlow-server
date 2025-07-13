import Stripe from "stripe";
import dotenv from "dotenv";
import { Agreement } from "../models/agreement.model.js";
import { User } from "../models/user.model.js";
import { Payment } from "../models/payment.model.js";
import { Coupon } from "../models/coupon.mode.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
    try {
      const { apartmentId, rent, month, coupon } = req.body;
      const userId = req.userId;
  
      if (!apartmentId || !rent || !month) {
        return res.status(400).json({
          message: "Missing required fields (apartmentId, rent, month)",
          success: false,
        });
      }
  
      const user = await User.findById(userId);
      if (!user || user.role !== "member") {
        return res.status(403).json({
          message: "You are not eligible for payment",
          success: false,
        });
      }
  
      const agreement = await Agreement.findOne({
        apartmentFor: apartmentId,
        requestedBy: userId,
      });
  
      if (!agreement || agreement.status !== "accepted") {
        return res.status(403).json({
          message: "You are not eligible to pay for this apartment",
          success: false,
        });
      }
  
      // Check if already paid for this apartment + month
      const existingPayment = await Payment.findOne({
        agreementFor: apartmentId,
        paymentedBy: userId,
        month: month,
      });
  
      if (existingPayment) {
        return res.status(400).json({
          message: `You already paid rent for ${month}`,
          success: false,
        });
      }
  
      let finalAmount = rent; 
      if (coupon) {
        const foundCoupon = await Coupon.findOne({ code: coupon.toUpperCase() });
  
        if (foundCoupon) {
          const now = new Date();
          if (foundCoupon.expiresAt > now) {
            const discount = (foundCoupon.discountPercentage / 100) * rent;
            finalAmount = rent - discount;
            if (finalAmount < 0) finalAmount = 0; 
          } else {
            return res.status(400).json({
              message: "Coupon expired",
              success: false,
            });
          }
        } else {
          return res.status(400).json({
            message: "Invalid coupon code",
            success: false,
          });
        }
      }
  
      // Create Stripe Payment Intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(finalAmount * 100), 
        currency: "usd",
        payment_method_types: ["card"],
      });
  
      res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("Payment Intent Error:", error.message);
      res.status(500).json({
        success: false,
        message: "Something went wrong while creating payment intent",
      });
    }
  };
  

export const savePaymentInfo = async (req, res) => {
    try {
      const { apartmentId, rent } = req.body;
      const userId = req.userId;
  
      const saved = await Payment.create({
        agreementFor: apartmentId,
        paymentAmount: rent,
        paymentedBy: userId,
      });
  
      res.status(201).json({
        success: true,
        message: "Payment saved successfully",
        payment: saved,
      });
    } catch (error) {
      console.log("Save Payment Error:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to save payment",
      });
    }
  };
  


export const getMemberPayment = async (req, res) => {
    try {
      const userId = req.userId;
      const paymentHistory = await Payment.find({ paymentedBy: userId })
        .populate("agreementFor")
        .sort({ createdAt: -1 });
  
      if (paymentHistory.length === 0) {
        return res.status(404).json({
          message: "No payment found for this user",
          success: false,
        });
      }
  
      return res.status(200).json({
        message: "Your payment history",
        success: true,
        paymentHistory,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get payment history",
      });
    }
  };

  

export const getAllPayment = async (req, res) => {
    try {
      const paymentHistory = await Payment.find()
        .populate("paymentedBy", "fullName email")
        .populate("agreementFor")
        .sort({ createdAt: -1 });
  
      if (paymentHistory.length === 0) {
        return res.status(404).json({
          message: "No payments found",
          success: false,
        });
      }
  
      return res.status(200).json({
        message: "All payment history",
        success: true,
        paymentHistory,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch payments",
      });
    }
  };
  