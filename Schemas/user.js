import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    code: { type: String },
    expiresAt: { type: Date },
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    districtCode: { type: String },
    mandalCode: { type: String },
    villageCode: { type: String },
  },
  { _id: false }
);

const serviceProviderSchema = new mongoose.Schema(
  {
    isProvider: { type: Boolean, default: false },

    businessName: { type: String },
    technicianName: { type: String },
    category: { type: String }, // Example: "Plumber", "Electrician", etc.
    workDescription: { type: String },
    experience: { type: Number }, // in years
    contactNumber: { type: String },

    serviceAreaCodes: [{ type: String }], // List of 6-digit village codes
    isApproved: { type: Boolean, default: false }, // Optional admin approval

    documents: {
      idProofUrl: { type: String },
      certificateUrl: { type: String },
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },

  isVerified: { type: Boolean, default: false },
  otp: otpSchema,

  profilePhoto: { type: String }, // Optional for profile pic URL

  address: addressSchema, // Current location of user

  serviceProvider: serviceProviderSchema,

  rating: {
    count: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
  },

  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  isOnline: { type: Boolean, default: false },
  lastSeen: { type: Date },

  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
