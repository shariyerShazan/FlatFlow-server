
import { Agreement } from "../models/agreement.model.js";
import { Apartment } from "../models/apartment.model.js";
import cloudinary from "../utils/cloudinary.js";
import { getDataUri } from "../utils/dataUri.js";

export const createApartment = async (req, res) => {
  try {
    const { block, floor, apartmentNo, rent} = req.body;
    // console.log(block , floor )
    const image = req.file
    if (!block || !floor || !apartmentNo || !rent || !image) {
      return res.status(400).json({
         message: "Missing required fields",
          success: false
         });
    }
     let cloudResponse
         if(image){
                const fileUri = getDataUri(image)
              cloudResponse = await cloudinary.uploader.upload(fileUri)
            } 

    const newApartment = await Apartment.create({
      block,
      floor,
      apartmentNo,
      rent,
      image :cloudResponse.secure_url ,
      available: true, 
    });

    res.status(201).json({ message: "Apartment list created", apartment: newApartment, success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to create apartment", success: false });
  }
};



export const getAllApartments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { rentMin, rentMax } = req.query; 

    let filter = {};
    if (rentMin && rentMax) {
      filter.rent = { $gte: Number(rentMin), $lte: Number(rentMax) };
    }

    const total = await Apartment.countDocuments(filter);
    const apartments = await Apartment.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      apartments,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalAppartments: total,
      success: true,
    });
  } catch (error) {
    console.error(error);  // 
    res.status(500).json({ message: "Failed to get apartments", success: false });
  }
};





export const getApartmentById = async (req , res) => {
  try {
    const apartmentId = req.params.id 
    const apartment = await  Apartment.findById(apartmentId)
    if(!apartment){
      return res.status(404).json({
        message : "Apartment not found" ,
        success: false
      })
    }
    return res.status(200).json({
      apartment ,
      success: true
    })
  } catch (error) {
    res.status(500).json({
       message: "Failed to get apartments", 
       success: false 
      });
  }
}



export const editApartment = async (req, res) => {
  try {
    const apartmentId = req.params.id;
    const { block, floor, apartmentNo, rent, available } = req.body; 
    const image = req.file;

    // Find apartment first
    const apartment = await Apartment.findById(apartmentId);
    if (!apartment) {
      return res.status(404).json({
         message: "Apartment not found",
          success: false 
        });
    }
 if(block){
  apartment.block = block
 }
 if(floor){
  apartment.floor = floor
 }
 if(apartmentNo){
  apartment.apartmentNo = apartmentNo
 }
 if(rent){
  apartment.rent = rent
 }
 if (available) {
  apartment.available = available;
}
    // If image uploaded, upload to cloudinary and update url
    if (image) {
      const fileUri = getDataUri(image);
      const cloudResponse = await cloudinary.uploader.upload(fileUri);
      apartment.image = cloudResponse.secure_url;
    }

await apartment.save()
    return res.status(200).json({
      message: "Apartment updated successfully",
      apartment,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
       message: "Failed to update apartment", 
       success: false 
      });
  }
};



export const deleteApartment = async (req, res) => {
  try {
    const apartmentId = req.params.id;
    const apartment = await Apartment.findByIdAndDelete(apartmentId);

    if (!apartment) {
      return res.status(404).json({
        message: "Apartment not found",
        success: false,
      });
    }
    await Agreement.deleteMany({apartmentFor: apartmentId})
    return res.status(200).json({
      message: "Apartment deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to delete apartment",
      success: false,
    });
  }
};




export const getAvailableApartment = async (req, res) => {
  try {
    const apartments = await Apartment.find({ available: true }); 

    if (!apartments || apartments.length === 0) {
      return res.status(404).json({
        message: "No available apartments found",
        success: false,
      });
    }

    return res.status(200).json({
      apartments,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get apartments",
      success: false,
      error: error.message,
    });
  }
};
