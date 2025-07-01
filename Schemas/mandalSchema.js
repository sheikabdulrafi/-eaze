import mongoose from "mongoose";

const mandalSchema = new mongoose.Schema({
  "Name of the Mandal": {
    type: String,
    required: true,
  },
  Code: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Mandal = mongoose.model("Mandal", mandalSchema, "Mandal");
