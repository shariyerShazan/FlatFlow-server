import { Payment } from "../models/payment.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const makePayment = async (req, res) => {
  try {
    const { amount, apartmentId, month, couponCode } = req.body;

    // TODO: Validate coupon, calculate discount if couponCode exists

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // cents
      currency: "usd",
      metadata: {
        userId: req.userId,
        apartmentId,
        month,
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret, success: true });
  } catch (error) {
    res.status(500).json({ message: "Payment failed", success: false });
  }
};

export const recordPayment = async (req, res) => {
  try {
    const { userId, apartmentId, amount, month, couponId, transactionId } = req.body;

    const payment = await Payment.create({
      user: userId,
      apartment: apartmentId,
      amount,
      month,
      couponApplied: couponId || null,
      paymentStatus: "completed",
      transactionId,
    });

    res.status(201).json({ message: "Payment recorded", success: true, payment });
  } catch (error) {
    res.status(500).json({ message: "Failed to record payment", success: false });
  }
};
