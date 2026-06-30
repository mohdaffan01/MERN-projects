import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/order.route.js";
import { autoDeliver } from "./job/autoDeliver.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware.js";

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cookieParser());

app.use(userRouter);
app.use(productRouter);
app.use(orderRouter);

app.use(errorMiddleware);


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    autoDeliver()//automatic process -> delivered after 1 minute
    app.listen(process.env.PORT, () => {
      console.log("Server listening on PORT:", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
  });
