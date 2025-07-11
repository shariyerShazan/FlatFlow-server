import mongoose from "mongoose";

const agreementSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  floor: { type: Number, required: true },
  block: { type: String, required: true },
  apartmentNo: { type: String, required: true },
  rent: { type: Number, required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  appliedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Agreement = mongoose.model("Agreement", agreementSchema);
