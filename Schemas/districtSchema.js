import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
  "Name of the District": {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

export const District = mongoose.model("District", districtSchema, "District");
