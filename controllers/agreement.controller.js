import { Agreement } from "../models/agreement.model.js";
import { Apartment } from "../models/apartment.model.js";
import { User } from "../models/user.model.js";

export const createAgreement = async (req, res) => {
  try {
    const userId = req.userId;
    const apartmentId = req.params.apartmentId;
    const { contactNo } = req.body;

    if (!contactNo) {
      return res.status(400).json({
        message: "Contact number is required",
        success: false
      });
    }

    const apartment = await Apartment.findById(apartmentId);
    if (!apartment) {
      return res.status(404).json({
        message: "Apartment not found",
        success: false
      });
    }

    // Check if user already requested this apartment
    const existingAgreement = await Agreement.findOne({
      apartmentFor: apartmentId,
      requestedBy: userId
    });

    if (existingAgreement) {
      return res.status(400).json({
        message: "Already booked",
        success: false
      });
    }

    const newAgreement = await Agreement.create({
      apartmentFor: apartmentId,
      requestedBy: userId,
      contactNo
    });

    return res.status(201).json({
      message: "Apartment booking requested successfully",
      success: true,
      agreement: newAgreement
    });

  } catch (error) {
    console.error("Error in agreement logic:", error.message);
    return res.status(500).json({
      message: "Failed to process agreement request",
      success: false
    });
  }
};



export const cancelAgreement = async (req, res) => {
  try {
    const userId = req.userId;
    const apartmentId = req.params.apartmentId;

    const existingAgreement = await Agreement.findOne({
      apartmentFor: apartmentId,
      requestedBy: userId
    });

    if (!existingAgreement) {
      return res.status(404).json({
        message: "No existing booking found to cancel",
        success: false
      });
    }

    await Agreement.findByIdAndDelete(existingAgreement._id);

    return res.status(200).json({
      message: "Booking request has been cancelled successfully",
      success: true
    });

  } catch (error) {
    console.error("Error in cancelAgreement:", error.message);
    return res.status(500).json({
      message: "Failed to cancel agreement",
      success: false
    });
  }
};



export const getUserAgreemented = async (req, res)=>{
  try {
     const userId = req.userId 
     const userAgreemented = await Agreement.find({requestedBy: userId}).populate("apartmentFor")
     if(!userAgreemented){
      return res.status(404).json({
        message : "Your don't applyed yet",
        success: false
      })
     }
     return res.status(200).json({
      userAgreemented,
      success: true
     })
  } catch (error) {
    return res.status(500).json({
      message: "Failed",
      success: false
    });
  }
}


export const getAllAgreements = async (req, res) => {
    try {
      const agreements = await Agreement.find().sort({createdAt: -1})
        .populate("apartmentFor")
        .populate("requestedBy");
  
      res.status(200).json({
        message: "All agreements fetched successfully",
        success: true,
        agreements,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch agreements",
        success: false,
      });
    }
  };
  
  
  
  
  
  
  export const handleAgreement = async (req, res) => {
    try {
      const agreementId = req.params.agreementId;
      const { action } = req.body; 
  // console.log(agreementId)
      const agreement = await Agreement.findById(agreementId);
      if (!agreement) {
        return res.status(404).json({
          message: "Agreement not found",
          success: false,
        });
      }
  
      if (action === "accepted") {
        // Apartment update
        const apartment = await Apartment.findById(agreement.apartmentFor);
        if (!apartment) {
          return res.status(404).json({
            message: "Apartment not found",
            success: false,
          });
        }
        apartment.available = false;
        await apartment.save();
  
        // Make user member
        const user = await User.findById(agreement.requestedBy);
        if (!user) {
          return res.status(404).json({
            message: "User not found",
            success: false,
          });
        }
        user.role = "member";
        await user.save();

        agreement.status = "accepted"
        await agreement.save()
  
        return res.status(200).json({
          message: "Agreement accepted. Apartment rented & user is now a member.",
          success: true,
        });
      }
  
      if (action === "rejected") {
        agreement.status = "rejected"
        await agreement.save()

        return res.status(200).json({
          message: "Agreement rejected successfully.",
          success: true,
        });
      }
  
      return res.status(400).json({
        message: "Invalid action. Must be 'accepted' or 'rejected'",
        success: false,
      });
  
    } catch (error) {
      console.error("Handle agreement error:", error.message);
      return res.status(500).json({
        message: "Failed to process agreement",
        success: false,
      });
    }
  };
  
