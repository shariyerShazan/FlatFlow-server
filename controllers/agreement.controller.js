import { Agreement } from "../models/agreement.model.js";

export const applyForAgreement = async (req, res) => {
  try {
    const { floor, block, apartmentNo, rent } = req.body;

    const existing = await Agreement.findOne({ user: req.userId });
    if (existing)
      return res.status(400).json({ message: "Already applied for an agreement", success: false });

    const newAgreement = await Agreement.create({
      user: req.userId,
      floor,
      block,
      apartmentNo,
      rent,
      status: "pending",
    });

    res.status(201).json({ message: "Agreement applied", success: true, agreement: newAgreement });
  } catch (error) {
    res.status(500).json({ message: "Failed to apply for agreement", success: false });
  }
};

export const getMyAgreement = async (req, res) => {
  try {
    const agreement = await Agreement.findOne({ user: req.userId });
    res.status(200).json({ agreement, success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to get agreement", success: false });
  }
};
