import express from "express";
import dotenv from "dotenv";
import router from "./mainRouter.js";
import { connectDB } from "./connectDB.js";

dotenv.config();

const app = express();

// ✅ Always parse the request body *before* using the router
app.use(express.json());

connectDB();

app.use(router); // Now JSON body will be available in routes

app.listen(process.env.PORT || 5599, () => {
  console.log(`🚀 Server started: http://localhost:${process.env.PORT}`);
});
