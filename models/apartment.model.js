import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema({
  block: { type: String, required: true },
  floor: { type: Number, required: true },
  apartmentNo: { type: String, required: true },
  rent: { type: Number, required: true },
  image: { type: String }, 
  available: { type: Boolean, default: true },
}, { timestamps: true });

export const Apartment = mongoose.model("Apartment", apartmentSchema);
