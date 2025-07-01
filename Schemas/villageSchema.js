import mongoose from "mongoose";

const villageSchema = new mongoose.Schema({
  village: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Village = mongoose.model("Village", villageSchema, "Village");
