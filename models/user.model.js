import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password : String,
  photo: String,
  role: { type: String, enum: ['user', 'member', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
} , {timestamps: true});

 export const User = mongoose.model('User', userSchema);


