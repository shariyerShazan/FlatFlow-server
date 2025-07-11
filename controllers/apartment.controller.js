import { Apartment } from "../models/apartment.model.js";

export const getAllApartments = async (req, res) => {
  try {
    // Pagination logic
    let { page = 1, rentMin, rentMax } = req.query;
    page = parseInt(page);
    const limit = 6;
    const skip = (page - 1) * limit;

    let filter = {};
    if (rentMin && rentMax) {
      filter.rent = { $gte: Number(rentMin), $lte: Number(rentMax) };
    }

    const total = await Apartment.countDocuments(filter);
    const apartments = await Apartment.find(filter).skip(skip).limit(limit);

    res.status(200).json({
      apartments,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get apartments", success: false });
  }
};
