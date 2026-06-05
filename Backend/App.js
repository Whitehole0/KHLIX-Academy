import dotenv from "dotenv";
dotenv.config();

import express from "express";

import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.config.js";

import { errorHandler } from "./Middleware/errorHandler.middleware.js";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

if (process.env.NODE_ENV === "dev") {
  app.use(morgan());
}

app.use(errorHandler);

connectDB();

app.listen(process.env.PORT, () => {
  console.log("the server is listening");
});
