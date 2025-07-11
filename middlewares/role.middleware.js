import { User } from "../models/user.model.js";

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user?.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: Only admin allowed",
        success: false,
      });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const isMember = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user?.role !== "member") {
      return res.status(403).json({
        message: "Forbidden: Only member allowed",
        success: false,
      });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error", success: false });
  }
};
