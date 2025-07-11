import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const register = async (req, res) => {
  const { name, email, password, photo } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" ,  success: false});

    if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters long.",
        });
      }
      if (!/[a-zA-Z]/.test(password)) {
        return res.status(400).json({
          success: false,
          message: "Password must contain at least one letter",
        });
      }
      if (!/\d/.test(password)) {
        return res.status(400).json({
          success: false,
          message: "Password must contain at least one number",
        });
      }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      photo,
    });

    res.status(201).json({ message: "User created successfully" , success: true });

  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message  , success: false});
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found"  , success: false });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return res.status(401).json({ message: "Invalid credentials"  , success: false});

    const token = jwt.sign(
      { userId: user._id,  },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200) .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,       
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      }).json({
      message: "Login successful",
      user , 
      success: true
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message  , success: false});
  }
};



export const logout = async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
  
      return res.status(200).json({
        message: "Logged out successfully.",
        success: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Logout failed", success: false });
    }
  };
  



export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to get profile", success: false });
  }
};
