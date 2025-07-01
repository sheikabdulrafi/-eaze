import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      console.log(`✅ MongoDB connected: ${conn.connection.host}, ${conn.connection.name}`);
    })
    .catch((err) => {
      console.error("❌ DB Connection Error:", err);
    });
};
