import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
      agreementFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apartment",
        required: true,
      },
      paymentAmount: {
        type: Number,
        required: true,
      },
      paymentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      month: {
        type: String,
        required: true,
        enum: [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ],
      },
    },
    { timestamps: true }
  );
  

  export const Payment = mongoose.model("Payment" , paymentSchema)