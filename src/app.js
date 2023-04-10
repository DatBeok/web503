import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/product";
import authRouter from "./routes/auth";
import categoryRouter from "./routes/category";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

// khởi tạo
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter)

mongoose.connect(process.env.URI);

export const viteNodeApp = app;
