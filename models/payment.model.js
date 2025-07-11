import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    apartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment",
      required: true,
    },
    amount: { type: Number, required: true },
    month: { type: String, required: true }, 
    paymentDate: { type: Date, default: Date.now },
    couponApplied: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    transactionId: { type: String }, 
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
