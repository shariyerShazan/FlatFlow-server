import mongoose, { Mongoose } from "mongoose";

const agreementSchema = new mongoose.Schema({
    apartmentFor : {
        type : mongoose.Schema.Types.ObjectId ,
        ref: "Apartment"
    } ,
    requestedBy : {
          type : mongoose.Schema.Types.ObjectId ,
        ref: "User"
    } ,
    contactNo: {
        type: Number ,
        required : true
    },
    status: {
       type: String,
       enum: ["pending", "accepted", "rejected"],
       default: "pending"
  },
} , {timestamps: true})

export const Agreement = mongoose.model("Agreement" , agreementSchema)