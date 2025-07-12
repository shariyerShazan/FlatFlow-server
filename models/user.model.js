import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName : {
    type : String ,
    required: true
  },
  email: {
     type: String,
      unique: true 
    },
  password :{
    type : String ,
    required : true
  },
  profilePicture : {
    type : String ,
    required : true
  },
  role: {
     type: String,
      enum: ['user', 'member', 'admin'],
       default: 'user'
     }
     
} , {timestamps: true});

 export const User = mongoose.model('User', userSchema);


