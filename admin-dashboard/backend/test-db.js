import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log("Connecting to:", process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Connection failed:", err);
    process.exit(1);
  });
